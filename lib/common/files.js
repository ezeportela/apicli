const fs = require('fs');
const jsYaml = require('js-yaml');

const getCurrentDirectoryBase = () => process.env.PWD;

const getFilePath = (filepath) => `${getCurrentDirectoryBase()}${filepath}`;

const _getRelativeFilePath = (filepath) => `${__dirname}/${filepath}`;

const _readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const readRelativeFile = (filepath) =>
  _readFile(_getRelativeFilePath(filepath));

const readFile = (filepath) => _readFile(getFilePath(filepath));

const writeFile = (filepath, content) =>
  fs.writeFileSync(getFilePath(filepath), content);

const readJsonFile = (filepath) => JSON.parse(readFile(filepath));

const _readYamlFile = (filepath) => jsYaml.safeLoad(filepath);

const readYamlFile = (filepath) => _readYamlFile(readFile(filepath));

const readYamlRelativeFile = (filepath) =>
  _readYamlFile(readRelativeFile(filepath));

const writeJsonFile = (filepath, content) =>
  writeFile(filepath, JSON.stringify(content, null, 2));

const writeYamlFile = (filepath, content) => {
  const result = jsYaml.safeDump(content);
  writeFile(filepath, result);
};

const requireDependency = (filepath) => require(getFilePath(filepath));

const existsFile = (filepath) => fs.existsSync(getFilePath(filepath));

const makeDir = (dir) => fs.mkdirSync(getFilePath(dir));

const readDir = (dir) => new Promise((resolve, reject) =>
  fs.readdir(getFilePath(dir), (err, files) => {
    if (err) return reject(err);

    return resolve(files);
  }),
);

module.exports = {
  getCurrentDirectoryBase,
  getFilePath,
  readRelativeFile,
  readFile,
  readJsonFile,
  readYamlFile,
  readYamlRelativeFile,
  writeFile,
  writeJsonFile,
  writeYamlFile,
  requireDependency,
  existsFile,
  makeDir,
  readDir,
};
