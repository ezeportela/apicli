const inquirer = require('inquirer');
const _ = require('lodash');

const createQuestion = (name, type, message, defaultValue) => ({
  name,
  type,
  message,
  default: defaultValue,
  validate: (value) => value.length ? true : `Please enter a ${name}.`,
});

const optionsQuestion = (name, message, choices, type, defaultValue) => ({
  ...createQuestion(name, type, message, defaultValue),
  choices,
});

const makeQuestions = (questions) => inquirer.prompt(questions);

const requestParams = (questions, options) => {
  let result = [];

  for (const question of questions) {
    if (_.isEmpty(options[question.name])) {
      result = [...result, question];
    }
  }

  return makeQuestions(result);
};

module.exports = {
  makeQuestions,

  requestParams,

  inputQuestion: (name, message, defaultValue) => createQuestion(name, 'input', message, defaultValue),

  listQuestion: (name, message, choices) => optionsQuestion(name, message, choices, 'list'),

  checkQuestion: (name, message, choices, defaultValue) => optionsQuestion(name, message, choices, 'checkbox', defaultValue),
};
