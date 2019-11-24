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
      .map((file) => file.replace('.json', ''))
      .filter((file) => options.prod || !/prod\w+/.test(file));
  
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
    const defaultConfig = files.readFile('/config/default.js');

    const regexr = defaultConfig.match(/(.*getServiceConfig\()([\s\S]*)(}\),)/gmi);
    const services = regexr[0].split('}),').filter((matched) => matched);

    const excludeQuotes = (text) => text.match(/[^']+/)[0];

    for (const service of services) {
      const serviceName = service.match(/(\w+)(?:)/i);
      const strings = service.match(/(?:')(.*)(?:')/gi);
      const dependency = excludeQuotes(strings[0]);
      const pathname = excludeQuotes(strings[1]);

      config.services[serviceName[0]] = {
        dependency,
        pathname,
      };
    }

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
