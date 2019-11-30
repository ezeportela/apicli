const {inputQuestion} = require('../../common/inquirer');

const questions = [
  inputQuestion('configDir', 'Application config dir', '/config'),
  inputQuestion('routesDir', 'Routes dir', '/src/application/routes'),
  inputQuestion('controllerDir', 'Controllers dir', '/src/application/controllers'),
  inputQuestion('servicesDir', 'Http Services dir', '/src/infrastructure/httpServices'),
];

module.exports = questions;
