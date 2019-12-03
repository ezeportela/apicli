const {exportConfig} = require('./config');
const {exportErrors} = require('./errors');
const {exportHttpServices} = require('./httpServices');

const exportCmd = async (options) => {
  if (options.config) exportConfig(options);

  if (options.errors) exportErrors(options);

  if (options.httpServices) exportHttpServices(options);

  if (options.routes) null;
};

module.exports = {exportCmd};
