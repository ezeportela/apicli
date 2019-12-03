const chalk = require('chalk');
const {askGenerate} = require('../inquirer');
const {generateRoutes} = require('../routes');
const {successMessage, errorMessage} = require('../common/bash');

module.exports = {
  generate: async () => {
    const result = await askGenerate();

    try {
      console.log(chalk.green(`Attemping to generate ${result.generate}`));
      switch (result.generate) {
      case 'routes':
        generateRoutes();
        break;
      case 'http services':
        break;
      default:
        break;
      }
      successMessage(`${result.generate} has been generated successfully`);
    } catch (err) {
      errorMessage(err.message);
    }
  },
};
