const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const {requireDependency} = require('../../common/files');
const files = require('../../common/files');

const importConfig = async (options) => {
  const spinner = createSpinner('importing configurations...');
  try {
    spinner.start();

    const config = {
      dependencies: {},
      env: {},
      services: {},
    };

    const dir = await files.readDir('/config');
    const environments = dir.filter((file) => /^.*.json/.test(file))
      .map((file) => file.replace('.json', ''));
  
    for (const environment of environments) {
      const filename = `/config/${environment}.json`;

      if (!files.existsFile(filename)) continue;

      const configFile = requireDependency(filename);

      // Get env vars
      if (configFile.env) {
        for (const env of Object.keys(configFile.env)) {
          if (!config.env[env]) config.env[env] = {};

          config.env[env][environment] = configFile.env[env];
        }
      }

      // Get Dependencies
      for (const dependency of Object.keys(configFile.dependencies)) {
        if (!config.dependencies[dependency]) config.dependencies[dependency] = {};

        const value = configFile.dependencies[dependency];
        const timeout = value.timeout;
        config.dependencies[dependency][environment] = {
          ...value.url,
          timeout,
        };
      }
    }

    // Get services
    // const defaultConfig = requireDependency('../config/default');

    // for (const service of Object.keys(defaultConfig.services)) {
    //   if (!config.services[service]) config.services[service] = {};

    //   const value = (defaultConfig.services[service]).toString();
    //   console.log(value)
    //   // config.services[service] = value;
    // }

    if (!files.existsFile('/apicli')) {
      files.makeDir('/apicli');
    }

    files.writeYamlFile('/apicli/config.yaml', config);

    spinner.stop();
    successMessage('configurations imported successfully!');
  } catch (err) {
    spinner.stop();
    errorMessage(err);
  }
}

module.exports = {importConfig};
