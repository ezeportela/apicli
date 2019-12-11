const exec = require('../../common/exec');
const {errorMessage, createSpinner} = require('../../common/bash');

const testCmd = async (options) => {
  const spinner = createSpinner('Executing script...');

  try {
    spinner.start();

    let commands = [];

    if (options.functionalTest) {
      commands = [
        'npm run functional-test --',
        options.debug ? '--debug' : '',
        options.filter ? `--featureFilter=${options.filter}` : '',
      ];
    } else {
      commands = [
        'npm t',
        options.filter ? `-- -g '${options.filter}'` : '',
      ];
    }

    console.log(commands.join(' '));
    const result = await exec(commands);

    spinner.stop();
    console.log(result);
  } catch (err) {
    spinner.stop();
    errorMessage(err);
  }
};

module.exports = {testCmd};
