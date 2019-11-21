const {exec} = require('../../common/exec');

const {successMessage, errorMessage} = require('../../common/message');

const sops = async (options) => {
  try {
    const flag = options.decrypt ? '-d' : '-e';
    const command = [
      'sops',
      '--config',
      './config/.sops.yaml',
      flag,
      '-i',
      options.file,
    ];

    const result = await exec(command.join(' '));
    console.log(result);
    successMessage('file encrypted/decrypted successfully!');
  } catch (err) {
    errorMessage(err);
  }
}

module.exports = {sops};
