#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const minimist = require('minimist');

const {askGenerate} = require('./lib/inquirer');
const {generateConfigFiles} = require('./lib/config');
const {generateRoutes} = require('./lib/routes');
const {generateHttpServices} = require('./lib/httpServices');


const run = async () => {
  const argv = minimist(process.argv.slice(2));
    
  switch(argv._[0]) {
    case 'version':
      const package = require('./package.json');
      console.log(`Version: ${package.version}`);
      break;
    case 'generate':
      const result = await askGenerate();
      
      switch (result.generate) {
        case 'config':
          generateConfigFiles();
          break;
        case 'routes':
          generateRoutes();
          break;
        case 'http services':
          generateHttpServices();
          break;
      }
      break;
  }
};

clear();
console.log(
  chalk.yellow(
    figlet.textSync('apicli', { horizontalLayout: 'full' })
  )
);
run();