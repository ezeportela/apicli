const exec = require('../../common/exec');
const {errorMessage, createSpinner, successMessage} = require('../../common/bash');

const installPostmanCmd = async (options) => {
  const spinner = createSpinner('Executing script...');

  try {
    await exec(['sudo ls']);
    spinner.start();

    await exec(['wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz']);
    await exec(['sudo tar -xzf postman.tar.gz -C /opt']);
    await exec(['rm postman.tar.gz']);
    await exec(['sudo ln -s /opt/Postman/Postman /usr/bin/postman']);

    spinner.stop();
    successMessage('Postman has been installed successfully!');
  } catch (err) {
    spinner.stop();
    errorMessage(err);
  }
};

module.exports = {installPostmanCmd};
