const {installCmd} = require('./install');

const registerCommands = (program) => {
  program
    .command('install')
    .alias('ins')
    .option('-p, --postman', 'Install Postman')
    .description('Install libraries')
    .action(installCmd);
};

module.exports = registerCommands;
