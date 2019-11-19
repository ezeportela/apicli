const chalk = require('chalk');
const {askGenerate} = require('../inquirer');
const {generateConfigFiles} = require('../config');
const {generateRoutes} = require('../routes');
const {generateHttpServices} = require('../httpServices');

module.exports = {
  generate: async () => {
    const result = await askGenerate();
    
    try {
      console.log(chalk.green(`Attemping to generate ${result.generate}`));
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
      console.log(chalk.green(`${result.generate} has been generated successfully`));
    } catch (err) {
      console.log(chalk.red(err.message));
    }
  },
}
