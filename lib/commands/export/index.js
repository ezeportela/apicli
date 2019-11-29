const {exportCmd} = require('./export');

const registerCommands = (program) => {
  program
    .command('export')
    .alias('e')
    .option('-c, --config', 'Export configs')
    .option('-e, --errors', 'Export errors')
    .description('Export configurations')
    .action(exportCmd);
};

module.exports = registerCommands;
