const git = require('simple-git');
const {askCommit} = require('../inquirer');
const package = require('../../package.json');
const files = require('../files');


module.exports = {
  commit: async () => {
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
    files.writeJsonFile('package.json', package);

    git()
      .add('.')
      .commit(result.message)
      .push(result.remote, result.branch);
  },
};
