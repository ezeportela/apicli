const {initCmd} = require('./init');

const registerCommands = (program) => {
  program
    .command('init')
    .description('Init api')
    .action(initCmd);
};

module.exports = registerCommands;
