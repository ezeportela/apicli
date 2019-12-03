const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const files = require('../../common/files');
const {createURI} = require('../../common/environments');
const {renderTemplate} = require('../../common/template');
const {getApi} = require('../../common/environments');

const exportHttpServices = async (options) => {
  const spinner = createSpinner('exporting configurations...');
  const api = getApi();

  try {
    spinner.start();

    const httpServices = files.readYamlFile(createURI('/httpServices.yaml'));

    for (const serviceName of Object.keys(httpServices.services)) {
      const {name, method, file} = httpServices.services[serviceName];

      const httpService = renderTemplate('export.httpServices.main', {
        serviceName,
        name,
        method,
      });

      files.writeFile(`${api.servicesDir}/${file}.service.js`, httpService);
    }

    spinner.stop();
    successMessage('http services exported successfully!');
  } catch (err) {
    console.error(err);
    spinner.stop();
    errorMessage(err);
  }
};

module.exports = {exportHttpServices};
