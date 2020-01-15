const {installPostmanCmd} = require('./postman');

const installCmd = async (options) => {
  if (options.postman) installPostmanCmd(options);
};

module.exports = {installCmd};
