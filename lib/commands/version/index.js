const package = require('../../../package.json');

module.exports = {
  version: () => {
    console.log(`Version: ${package.version}`);
  },
};
