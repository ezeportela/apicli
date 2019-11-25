const {exportConfig} = require('./config');

const exportCmd = async (options) => {
  if (options.config) exportConfig(options);
};

module.exports = {exportCmd};
