const {installCmd} = require('./install');

const registerCommands = (program) => {
  program
    .command('install')
    .alias('ins')
    .description('Install libraries')
    .action(installCmd);
};

module.exports = registerCommands;
