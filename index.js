#!/usr/bin/env node
const program = require('commander');

const registerVersionCommands = require('./lib/commands/version');
const registerGitCommands = require('./lib/commands/git');
const registerExecuteCommands = require('./lib/commands/execute');
const registerPublishCommands = require('./lib/commands/publish');
const registerInstallCommands = require('./lib/commands/install');

registerVersionCommands(program);
registerGitCommands(program);
registerExecuteCommands(program);
registerPublishCommands(program);
registerInstallCommands(program);

program.parse(process.argv);
