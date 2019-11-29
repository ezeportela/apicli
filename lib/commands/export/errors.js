const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const files = require('../../common/files');
const {getConfig} = require('../../common/environments');

const exportErrors = async (options) => {
  const spinner = createSpinner('exporting configurations...');
  const package = getConfig();

  try {
    spinner.start();

    const errors = {
      '$defaultResponseCodes': true,
      'connection_time_out': 500,
      'unmapped_error': 500,
      'invalid_token': 400,
      'unauthorized': 401,
      'method_not_allowed': 405,
      'forbidden': 403,
      'entity_validation_error': 400,
    };

    const errorCodes = files.readYamlFile(`/${package.config_folder}/errors.yaml`);

    for (const error of errorCodes.errors) {
      errors[error.code] = error.status;
    }

    files.writeJsonFile('/src/infrastructure/dictionaries/responseCodes.dictionary.json', errors);
    files.writeJsonFile('/src/domain/dictionaries/error.codes.json', errorCodes);

    spinner.stop();
    successMessage('errors exported successfully!');
  } catch (err) {
    console.error(err);
    spinner.stop();
    errorMessage(err);
  }
};

module.exports = {exportErrors};
