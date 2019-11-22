const fs = require('fs');
const jsYaml = require('js-yaml');

const getCurrentDirectoryBase = () => process.env.PWD;

const getFilePath = (filePath) => `${getCurrentDirectoryBase()}${filePath}`;

const readFile = (filePath) => fs.readFileSync(getFilePath(filePath), 'utf8');

const writeFile = (filePath, content) =>
  fs.writeFileSync(getFilePath(filePath), content);

const readJsonFile = (filePath) => JSON.parse(readFile(filePath));

const writeJsonFile = (filePath, content) =>
  writeFile(filePath, JSON.stringify(content, null, 2));

const writeYamlFile = (filepath, content) => {
  const result = jsYaml.safeDump(content);
  writeFile(filepath, result);
}

const requireDependency = (filePath) => require(getFilePath(filePath));

const existsFile = (filePath) => fs.existsSync(getFilePath(filePath));

const makeDir = (dir) => fs.mkdirSync(getFilePath(dir));

module.exports = {
  getCurrentDirectoryBase,
  getFilePath,
  readFile,
  readJsonFile,
  writeFile,
  writeJsonFile,
  writeYamlFile,
  requireDependency,
  existsFile,
  makeDir,
};
