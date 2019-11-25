const {importConfig} = require('./config');

const importCmd = async (options) => {
  if (options.config) importConfig(options);
};

module.exports = {importCmd};
