const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const {log} = console;
const cli = require('clui');
const Spinner = cli.Spinner;
const package = require('../../package.json');

module.exports = {
  successMessage: (message) => log(chalk.green(message)),

  errorMessage: (error, details = '') => console.error(chalk.red(error), details),

  createSpinner: (message) => new Spinner(message, ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']),

  printAppName: () => {
    clear();
    console.log(
      chalk.yellow(
        figlet.textSync(package.name, {horizontalLayout: 'full'}),
      ),
    );
    console.log('');
  },
};
