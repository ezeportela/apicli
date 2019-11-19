#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');

const {version} = require('./lib/commands/version');
const {generate} = require('./lib/commands/generate');


clear();
console.log(
  chalk.yellow(
    figlet.textSync('apicli', { horizontalLayout: 'full' })
  )
);

program
  .command('version')
  .alias('v')
  .description('Program Version')
  .action(version);

program
  .command('generate')
  .alias('g')
  .description('Generate config, routes and services')
  .action(generate);

program.parse(process.argv);