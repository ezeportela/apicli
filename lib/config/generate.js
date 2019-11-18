const jsYaml = require('js-yaml');
const files = require('../files');

const environments = [
  'desa',
  'test',
];

module.exports = {
  generateConfigFiles: () => {
    console.log(files.getCurrentDirectoryBase());

    const config = jsYaml.safeLoad(files.readFile('/config.yaml'));

    for (let environment of environments) {
      const configFile = require(files.getFilePath(`/config/${environment}.json`));

      configFile.env = {};
      for (let env of Object.keys(config.env)) {
        const value = config.env[env][environment];
        configFile.env[env] = value;
      }

      configFile.dependencies = {};
      for (let dependency of Object.keys(config.dependencies)) {
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
      files.writeFile(`/config/${environment}.json`, json);
    }
  }
};
