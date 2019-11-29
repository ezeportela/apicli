const {exportConfig} = require('./config');
const {exportErrors} = require('./errors');


const exportCmd = async (options) => {
  if (options.config) exportConfig(options);

  if (options.errors) exportErrors(options);
};

module.exports = {exportCmd};
