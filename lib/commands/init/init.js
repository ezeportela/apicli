const {makeQuestions} = require('../../common/inquirer');
const questions = require('./questions');
const files = require('../../common/files');
const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const {importConfig} = require('../import/config');
const {getConfig} = require('../../common/environments');
const {renderTemplate} = require('../../common/template');

const initCmd = async (options) => {
  const config = getConfig();
  const createURI = (path) => `/${config.name}${path}`;

  const spinner = createSpinner('importing configurations...');

  try {
    const results = await makeQuestions(questions);

    if (!files.existsFile(createURI())) {
      files.makeDir(createURI());
    }

    spinner.start();

    files.writeYamlFile(createURI('/api.yaml'), results);
    await importConfig({prod: false});
    await files.writeFile(createURI('/routes.yaml'), renderTemplate('init.routes'));

    spinner.stop();
    successMessage('the configuration has been init successfully!');
  } catch (err) {
    spinner.stop();
    errorMessage(`error has been occurred: ${err}`);
  }
};

module.exports = {initCmd};
