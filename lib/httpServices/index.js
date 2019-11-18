const jsYaml = require('js-yaml');
const files = require('../files');
const {createHttpServiceTemplate} = require('./templates');

module.exports = {
  generateHttpServices: () => {
    const configServices = jsYaml.safeLoad(files.readFile('/script/httpServices.yaml'));

    for (const service of Object.keys(configServices.services)) {
      serviceConfig = configServices.services[service];

      const httpService =
        createHttpServiceTemplate(service, serviceConfig);

      files.writeFile(`/src/infrastructure/httpServices/${serviceConfig.file}.service.js`, httpService);
    }
  },
};
