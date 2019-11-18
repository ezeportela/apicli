#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const minimist = require('minimist');

const {askGenerate} = require('./lib/inquirer');
const {generateConfigFiles} = require('./lib/config');
const {generateRoutes} = require('./lib/routes');

const run = async () => {
  const argv = minimist(process.argv.slice(2));
      
  if (argv._[0] === 'generate') {
    const result = await askGenerate();
    
    switch (result.generate) {
      case 'config':
        generateConfigFiles();
      case 'routes':
        generateRoutes();
    }
  }
};

clear();
console.log(
  chalk.yellow(
    figlet.textSync('apicli', { horizontalLayout: 'full' })
  )
);
run();