const inquirer = require('inquirer');

const createQuestion = (name, type, message, defaultValue) => ({
  name,
  type,
  message,
  default: defaultValue,
  validate: (value) => value.length ? true : `Please enter a ${name}.`,
});

module.exports = {
  makeQuestions: (questions) => inquirer.prompt(questions),

  inputQuestion: (name, message, defaultValue) => createQuestion(name, 'input', message, defaultValue),

  listQuestion: (name, message, choices) => ({
    ...createQuestion(name, 'list', message),
    choices,
  }),
};
