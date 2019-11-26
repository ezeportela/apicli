const files = require('./files');

const getConfig = () => files.readYamlRelativeFile('../config.yaml');

const getEnvironments = async (directory, isProd) => {
  const dir = await files.readDir(directory);
  return dir.filter((file) => /^.*.json/.test(file))
    .map((file) => file.replace('.json', ''))
    .filter((file) => isProd || !/prod\w+/.test(file));
};

module.exports = {
  getEnvironments,
  getConfig,
};
