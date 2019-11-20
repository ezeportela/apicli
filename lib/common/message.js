const chalk = require('chalk');
const {log} = console;

module.exports = {
  successMessage: (message) => log(chalk.green(message)),

  errorMessage: (error) => console.log(chalk.red(error)),
};
