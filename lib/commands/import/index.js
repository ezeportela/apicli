const {importCmd} = require('./import');

const registerCommands = (program) => {
  program
    .command('import')
    .alias('i')
    .option('-c, --config', 'Import configs')
    .option('-p, --prod', 'Production enabled')
    .description('Import configurations')
    .action(importCmd);
};

module.exports = registerCommands;
