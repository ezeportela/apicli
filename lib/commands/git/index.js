const {commit} = require('./commit');
const {pull} = require('./pull');

const registerCommands = (program) => {
  program
    .command('commit')
    .alias('c')
    .description('Commit changes')
    .action(commit);

  program
    .command('pull')
    .alias('p')
    .description('Pull changes')
    .action(pull);
};

module.exports = registerCommands;
