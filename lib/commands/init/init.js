const {makeQuestions} = require('../../common/inquirer');
const questions = require('./questions');

const {successMessage, errorMessage} = require('../../common/bash');

const initCmd = async (options) => {
  try {
    const results = await makeQuestions(questions);
    console.log(results);
    successMessage('the configuration has been init successfully!');
  } catch (err) {
    errorMessage('error has been occurred');
  }
};

module.exports = {initCmd};
