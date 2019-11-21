const exec = require('../../common/exec');
const {successMessage, errorMessage} = require('../../common/message');

const sops = async (options) => {
  try {
    const command = [
      'sops',
      '--config',
      options.config,
      options.decrypt ? '-d' : '-e',
      '-i',
      options.file,
    ];

    await exec(command);
    successMessage('file encrypted/decrypted successfully!');
  } catch (err) {
    errorMessage(err);
  }
}

module.exports = {sops};
