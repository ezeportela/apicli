const exec = require('../../common/exec');
const {successMessage, errorMessage, createSpinner} = require('../../common/bash');

const sops = async (options) => {
  const spinner = createSpinner('encrypting/decrypting file...');
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
