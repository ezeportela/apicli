const chalk = require('chalk');
const {askGenerate} = require('../inquirer');
const {generateConfigFiles} = require('../config');
const {generateRoutes} = require('../routes');
const {generateHttpServices} = require('../httpServices');
const {successMessage, errorMessage} = require('../common/message');

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
      successMessage(`${result.generate} has been generated successfully`);
    } catch (err) {
      errorMessage(err.message);
    }
  },
}
