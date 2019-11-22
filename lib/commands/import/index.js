const {importConfig} = require('./import');

const registerCommands = (program) => {
  program
    .command('import')
    .alias('i')
    .description('Import configurations')
    .action(importConfig);
};

module.exports = registerCommands;
