const exec = require('../../common/exec');
const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const spinner = createSpinner('Encrypt/Decrypt file, please wait...');

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

    spinner.start();
    await exec(command);
    spinner.stop();

    successMessage('file encrypted/decrypted successfully!');
  } catch (err) {
    spinner.stop();
    errorMessage(err);
  }
}

module.exports = {sops};
