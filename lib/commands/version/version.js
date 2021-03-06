const {readJsonFile} = require('../../common/files');
const {successMessage} = require('../../common/bash');
const {printAppName} = require('../../common/bash');

module.exports = {
  version: (options) => {
    const package = options.app ?
      readJsonFile('/package.json') :
      require('../../../package.json');

    printAppName();

    const message = [
      package.name,
      'version:',
      package.version,
    ];

    successMessage(message.join(' ').trim());
  },
};
