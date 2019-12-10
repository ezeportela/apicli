const {successMessage, errorMessage, createSpinner} = require('../common/bash');
const {getEnvironment, getConfig, getApi} = require('../common/environments');

class AbstractCommandScript {
  beforeExecute() {
    return null;
  }

  getCommandOptions() {
    throw new Error('getCommandOptions not implemented yet');
  }

  executeCommandScript(options, context) {
    throw new Error('executeCommandScript not implemented yet');
  }

  execute(options) {
    const commandOptions = this.getCommandOptions();

    const spinner = createSpinner(commandOptions.spinnerMessage);

    try {
      if (options.noUI) {
        spinner.start();
      }

      this.executeCommandScript(options, {
        environment: getEnvironment(),
        config: getConfig(),
        api: getApi(),
      });

      if (options.noUI) {
        spinner.stop();
        successMessage(commandOptions.successMessage);
      }
    } catch (err) {
      if (options.noUI) {
        spinner.stop();
        errorMessage(commandOptions.errorMessage, err);
      }
    }
  }

  afterExecute() {
    return null;
  }
}

module.exports = AbstractCommandScript;
