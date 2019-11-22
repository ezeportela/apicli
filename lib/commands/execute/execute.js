const exec = require('../../common/exec');
const {errorMessage, createSpinner} = require('../../common/bash');
const spinner = createSpinner('Executing script...');

const execute = async (options) => {
  try {
    const commands = [];
    
    if (options.ports) commands.push(['lsof -i -P -n | grep LISTEN']);

    for (const command of commands) {
      spinner.start();
      const result = await exec(command);
      spinner.stop();
      console.log(result);
    }
  } catch (err) {
    spinner.stop();
    errorMessage(err);
  }
}

module.exports = {execute};
