const {testCmd} = require('./test');

const registerCommands = (program) => {
  program
    .command('test')
    .alias('t')
    .option('-d, --debug', 'Enable debug mode')
    .option('-f, --functional-test', 'Execute functional tests')
    .option('-g, --filter <feature>', 'Filter tests')
    .description('Execute tests')
    .action(testCmd);
};

module.exports = registerCommands;
