#!/usr/bin/env node
const program = require('commander');

const {printAppName} = require('./lib/common/bash');
const registerVersionCommands = require('./lib/commands/version');
const {generate} = require('./lib/commands/generate');
const registerImportsCommands = require('./lib/commands/import');
const registerExportsCommands = require('./lib/commands/export');
const registerGitCommands = require('./lib/commands/git');
const registerSopsCommands = require('./lib/commands/sops');
const registerExecuteCommands = require('./lib/commands/execute');

printAppName();

registerVersionCommands(program);

program
  .command('generate')
  .alias('g')
  .description('Generate config, routes and services')
  .action(generate);

registerImportsCommands(program);
registerExportsCommands(program);
registerGitCommands(program);
registerSopsCommands(program);
registerExecuteCommands(program);

program.parse(process.argv);
