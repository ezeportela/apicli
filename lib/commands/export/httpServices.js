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
      const {
        name,
        method,
        file,
        headers,
        pathString,
        requestData,
      } = httpServices.services[serviceName];

      const imports = [];
      const addons = [];

      if (pathString) {
        imports.push(
          renderTemplate('export.httpServices.importURI', {}),
        );
        addons.push(
          renderTemplate('export.httpServices.getURI', {
            pathString,
          }),
        );
      }

      if (headers) {
        const getHeaders = [];
        for (const header of headers) {
          getHeaders.push(
            renderTemplate('export.httpServices.header', {
              name: header.name,
              header: header.header,
            }),
          );
        }
        addons.push(
          renderTemplate('export.httpServices.getHeaders', {
            headers: getHeaders.join('\n'),
          }),
        );
      }

      if (requestData) {
        let request = '';
        for (const data of requestData) {
          if (data == 'null' || data == null) {
            request = 'null';
            break;
          }

          request += renderTemplate('export.httpServices.requestData', {
            data,
          });
        }
        addons.push(
          renderTemplate('export.httpServices.getRequestData', {
            data: request == null ? request : `{\n${request}    }`,
          }),
        );
      }

      const httpService = renderTemplate('export.httpServices.main', {
        serviceName,
        name,
        method,
        imports: imports.join('\n'),
        addons: addons.join('\n\n'),
      });

      console.log(httpService);
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
