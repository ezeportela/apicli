const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const files = require('../../common/files');
const {getEnvironments, getConfig} = require('../../common/environments');
const {renderTemplate} = require('../../common/template');

const exportConfig = async (options) => {
  const spinner = createSpinner('exporting configurations...');
  const package = getConfig();

  try {
    spinner.start();

    const config = files.readYamlFile(`/${package.config_folder}/config.yaml`);

    const environments = await getEnvironments('/config', options.prod);

    for (const environment of environments) {
      const configFilename = `/config/${environment}.json`;
      const configFile = require(files.getFilePath(configFilename));

      configFile.env = {};
      for (const env of Object.keys(config.env)) {
        const value = config.env[env][environment];
        configFile.env[env] = value;
      }

      configFile.dependencies = {};
      for (const dependency of Object.keys(config.dependencies)) {
        const value = config.dependencies[dependency][environment];
        configFile.dependencies[dependency] = {
          url: {
            hostname: value.hostname,
            port: value.port,
            protocol: value.protocol,
          },
          timeout: value.timeout,
        };
      }

      const json = JSON.stringify(configFile, null, 2);
      files.writeFile(configFilename, json);
    }

    if (config.services) {
      const defaultConfigFilename = '/config/default.js';
      let defaultConfig = files.readFile(defaultConfigFilename);

      const servicesCollection = [];
      for (const service of Object.keys(config.services)) {
        const {dependency, pathname} = config.services[service];
        servicesCollection.push(
          renderTemplate('export.config.getServiceConfig', {
            service,
            dependency,
            pathname,
          }),
        );
      }

      defaultConfig = defaultConfig
        .replace(
          /services:\s*{\s*.*\s*}/gm,
          renderTemplate('export.config.services', {serviceConfig: servicesCollection.join('\n')}),
        );

      defaultConfig = defaultConfig
        .replace(
          /(.*getServiceConfig\()([\s\S]*)(}\),)/gm,
          servicesCollection.join('\n'),
        );
      files.writeFile(defaultConfigFilename, defaultConfig);
    }

    spinner.stop();
    successMessage('configurations exported successfully!');
  } catch (err) {
    spinner.stop();
    errorMessage(err);
  }
};

module.exports = {exportConfig};
