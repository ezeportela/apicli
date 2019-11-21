const {readJsonFile} = require('../../common/files');
const {successMessage} = require('../../common/message');

module.exports = {
  version: (options) => {
    const package = options.app
      ? readJsonFile('/package.json')
      : require('../../../package.json');

    const message = [
      options.app ? 'App' : '',
      'version:',
      package.version,
    ];

    successMessage(message.join(' ').trim());
  },
};
