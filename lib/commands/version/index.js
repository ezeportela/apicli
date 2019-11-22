const {version} = require('./version');

const registerCommands = (program) => {
  program
    .command('version')
    .alias('v')
    .option('-a, --app', 'Gets the app version')
    .description('Program Version')
    .action(version);
};

module.exports = registerCommands;