const {sops} = require('./sops');

const registerCommands = (program) => {
  program
    .command('sops')
    .alias('s')
    .option('-c, --config <filepath>', 'path of config file', './config/.sops.yaml')
    .option('-e, --encrypt', 'encrypt file')
    .option('-d, --decrypt', 'decrypt file')
    .option('-f, --file <filepath>', 'path of file', './config/prodblue.json')
    .description('Encrypt/Decrypt files')
    .action(sops);
};

module.exports = registerCommands;
