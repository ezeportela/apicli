const inquirer = require('inquirer');

module.exports = {
  makeQuestions: (questions) => inquirer.prompt(questions),
};
