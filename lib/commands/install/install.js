// const {successMessage, errorMessage} = require('../../common/bash');
// const files = require('../../common/files');
// const inquirer = require('../../common/inquirer');
// const {renderTemplate} = require('../../common/template');
// const {getApi} = require('../../common/environments');
const {installPostmanCmd} = require('./postman');

const installCmd = async (options) => {
  try {
    if (options.postman) installPostmanCmd(options);

    // const api = getApi();
    // const templates = await files.readRelativeDir('../templates/install/');

    // const questions = [inquirer.checkQuestion('libraries', 'select the libraries:', templates.map((template) => template.replace(/\.txt/, '')))];
    // const result = await inquirer.makeQuestions(questions);

    // for (const library of result.libraries) {
    //   files.writeFile(`${api.libDir}/${library}.js`, renderTemplate(`install.${library}`));
    // }

    // successMessage('the libraries has been installed successfully');
  } catch (err) {
    // errorMessage('An error has been ocurred while installing the libraries', err);
  }
};

module.exports = {installCmd};
