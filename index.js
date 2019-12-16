#!/usr/bin/env node
const program = require('commander');

const {printAppName} = require('./lib/common/bash');
const registerVersionCommands = require('./lib/commands/version');
const registerImportsCommands = require('./lib/commands/import');
const registerExportsCommands = require('./lib/commands/export');
const registerGitCommands = require('./lib/commands/git');
const registerSopsCommands = require('./lib/commands/sops');
const registerExecuteCommands = require('./lib/commands/execute');
const registerInitCommands = require('./lib/commands/init');
const registerInstallCommands = require('./lib/commands/install');
const registerTestCommands = require('./lib/commands/test');
const registerPublishCommands = require('./lib/commands/publish');

printAppName();

registerVersionCommands(program);

registerImportsCommands(program);
registerExportsCommands(program);
registerGitCommands(program);
registerSopsCommands(program);
registerExecuteCommands(program);
registerInitCommands(program);
registerInstallCommands(program);
registerTestCommands(program);
registerPublishCommands(program);

program.parse(process.argv);
