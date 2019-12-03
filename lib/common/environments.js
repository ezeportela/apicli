const files = require('./files');

const getConfig = () => files.readYamlRelativeFile('../config.yaml');

const getEnvironments = async (directory, isProd) => {
  const dir = await files.readDir(directory);
  return dir.filter((file) => /^.*.json/.test(file))
    .map((file) => file.replace('.json', ''))
    .filter((file) => isProd || !/prod\w+/.test(file));
};

const config = getConfig();

const createURI = (path = '') => `/${config.name}${path}`;

const getApi = () => files.readYamlFile(createURI('/api.yaml'));

module.exports = {
  getEnvironments,
  getConfig,
  createURI,
  getApi,
};
