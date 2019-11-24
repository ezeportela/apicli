const {importConfig} = require('./import');

const registerCommands = (program) => {
  program
    .command('import')
    .alias('i')
    .option('-p, --prod', 'Production enabled flag')
    .description('Import configurations')
    .action(importConfig);
};

module.exports = registerCommands;
