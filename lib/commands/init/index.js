const {initCmd} = require('./init');

const registerCommands = (program) => {
  program
    .command('init')
    .option('-c, --config-dir <filePath>', 'Specify the config dir')
    .description('Init api')
    .action(initCmd);
};

module.exports = registerCommands;
