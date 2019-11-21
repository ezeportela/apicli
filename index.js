#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');

const {version} = require('./lib/commands/version');
const {generate} = require('./lib/commands/generate');
const {commit, pull} = require('./lib/commands/git');
const {sops} = require('./lib/commands/sops');
const registerExecuteCommands = require('./lib/commands/execute');


clear();
console.log(
  chalk.yellow(
    figlet.textSync('apicli', {horizontalLayout: 'full'}),
  ),
);
console.log('');

program
  .command('version')
  .alias('v')
  .option('-a, --app', 'Gets the app version')
  .description('Program Version')
  .action(version);

program
  .command('generate')
  .alias('g')
  .description('Generate config, routes and services')
  .action(generate);

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

program
  .command('sops')
  .alias('s')
  .option('-c, --config <filepath>', 'path of config file', './config/.sops.yaml')
  .option('-e, --encrypt', 'encrypt file')
  .option('-d, --decrypt', 'decrypt file')
  .option('-f, --file <filepath>', 'path of file', './config/prodblue.json')
  .description('Encrypt/Decrypt files')
  .action(sops);

registerExecuteCommands(program);

program.parse(process.argv);
