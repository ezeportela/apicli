const git = require('simple-git');
const {askCommit} = require('../inquirer');
const package = require('../../package.json');
const files = require('../files');
const chalk = require('chalk');

module.exports = {
  commit: async () => {
    try {
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

      package.version = result.version;
      await files.writeJsonFile('/package.json', package);

      git()
        .add('.')
        .commit(result.message)
        .push(result.remote, result.branch);

      console.log(chalk.green('The changes has been commited successfully'));
    } catch (err) {
      console.log(chalk.red(err.message));
    }
  },
};
