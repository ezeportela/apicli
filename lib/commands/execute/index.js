const {execute} = require('./execute');

const registerCommands = (program) => {
  program
    .command('exec')
    .alias('e')
    .option('-p, --ports', 'Gets the ports in use')
    .description('Exec commands')
    .action(execute);
};

module.exports = registerCommands;