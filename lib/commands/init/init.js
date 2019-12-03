const {makeQuestions} = require('../../common/inquirer');
const questions = require('./questions');
const files = require('../../common/files');
const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const {importConfig} = require('../import/config');
const {createURI} = require('../../common/environments');
const {renderTemplate} = require('../../common/template');

const initCmd = async (options) => {
  const spinner = createSpinner('initializing project...');

  try {
    if (files.existsFile(createURI('/api.yaml'))) {
      successMessage('the project has already been initted');
      return;
    }

    const results = await makeQuestions(questions);

    if (!files.existsFile(createURI())) {
      files.makeDir(createURI());
    }

    spinner.start();

    files.writeYamlFile(createURI('/api.yaml'), results);
    await importConfig({prod: false});
    await files.writeFile(createURI('/routes.yaml'), renderTemplate('init.routes'));
    await files.writeFile(createURI('/httpServices.yaml'), renderTemplate('init.httpServices'));
    await files.writeFile(createURI('/errors.yaml'), renderTemplate('init.errors'));

    spinner.stop();
    successMessage('the configuration has been init successfully!');
  } catch (err) {
    spinner.stop();
    errorMessage(`error has been occurred: ${err}`);
  }
};

module.exports = {initCmd};
