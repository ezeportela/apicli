const git = require('simple-git');
const {askCommit} = require('../inquirer');
const files = require('../files');
const {successMessage, errorMessage} = require('../common/message');

module.exports = {
  commit: async () => {
    try {
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
      ]
    
      const result = await askCommit(versionChoices);

      const {
        version,
        message,
        remote,
        branch,
      } = result;

      package.version = version.substr(0, version.indexOf('(') - 1);
      await files.writeJsonFile('/package.json', package);

      git(files.getCurrentDirectoryBase())
        .add('.')
        .commit(message)
        .push(remote, branch)
        .exec(successMessage('The changes has been commited successfully'));
    } catch (err) {
      errorMessage(err.message);
    }
  },
};
