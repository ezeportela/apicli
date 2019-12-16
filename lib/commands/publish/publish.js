const {successMessage, errorMessage} = require('../../common/bash');
const {commit} = require('../git/commit');
const exec = require('../../common/exec');

const publishCmd = async (options) => {
  try {
    await exec(['npm t']);
    await commit();
    await exec(['npm publish --access=public']);

    successMessage('the library has been published successfully');
  } catch (err) {
    errorMessage('An error has been ocurred while publishing the libraries', err);
  }
};

module.exports = {publishCmd};
