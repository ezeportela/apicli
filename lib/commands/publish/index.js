const {publishCmd} = require('./publish');

const registerCommands = (program) => {
  program
    .command('publish')
    .alias('pub')
    .description('Publish library')
    .action(publishCmd);
};

module.exports = registerCommands;
