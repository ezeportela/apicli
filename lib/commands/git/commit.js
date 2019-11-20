const simpleGit = require('simple-git');
const {makeQuestions} = require('../../common/inquirer');

const files = require('../../common/files');
const {successMessage, errorMessage} = require('../../common/message');
const {getCommitQuestions} = require('./questions');
const GitService = require('./service');

module.exports = {
  commit: async () => {
    try {
      const git = new GitService();

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

      const branches = await git.getBranches();
      const remotes = await git.getRemotes();

      const result = await makeQuestions(
        getCommitQuestions(
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

      git.commit(
        remote,
        branch,
        message,
        successMessage('The changes has been commited successfully')
      );
    } catch (err) {
      errorMessage(err.message);
    }
  },
};
