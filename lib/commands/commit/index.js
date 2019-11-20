const simpleGit = require('simple-git');
const {makeQuestions} = require('../../common/inquirer');

const files = require('../../common/files');
const {successMessage, errorMessage} = require('../../common/message');
const {getQuestions} = require('./questions');
const {getBranches, getRemotes} = require('./functions');

module.exports = {
  commit: async () => {
    try {
      const git = simpleGit(files.getCurrentDirectoryBase());

      const branches = await getBranches(git);
      const remotes = await getRemotes(git);

      const package = require(files.getFilePath('/package.json'));
      const versions = package.version
        .concat(',')
        .repeat(3)
        .split(',')
        .filter((str) => str)
        .map((ver) => ver.split('.'))
        .map((list) => list.map((ver) => parseInt(ver)));

      // patch
      versions[0][2]++;

      // minor
      versions[1][2] = 0;
      versions[1][1]++;

      // major
      versions[2][2] = 0;
      versions[2][1] = 0;
      versions[2][0]++;

      const versionChoices = [
        `${versions[0].join('.')} (patch)`,
        `${versions[1].join('.')} (minor)`,
        `${versions[2].join('.')} (major)`,
      ];

      const result = await makeQuestions(
        getQuestions(
          versionChoices,
          branches.all,
          remotes.map((remote) => remote.name),
        ),
      );

      const {
        version,
        message,
        remote,
        branch,
      } = result;

      package.version = version.substr(0, version.indexOf('(') - 1);
      await files.writeJsonFile('/package.json', package);

      git
        .add('.')
        .commit(message)
        .push(remote, branch)
        .exec(successMessage('The changes has been commited successfully'));
    } catch (err) {
      errorMessage(err.message);
    }
  },
};
