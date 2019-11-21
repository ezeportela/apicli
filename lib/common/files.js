const fs = require('fs');

const getCurrentDirectoryBase = () => process.env.PWD;
const getFilePath = (pathname) => `${getCurrentDirectoryBase()}${pathname}`;
const readFile = (pathname) => fs.readFileSync(getFilePath(pathname), 'utf8');
const writeFile = (pathname, content) =>
  fs.writeFileSync(getFilePath(pathname), content);

module.exports = {
  getCurrentDirectoryBase,
  getFilePath,
  readFile,
  readJsonFile: (pathname) => JSON.parse(readFile(pathname)),
  writeFile,
  writeJsonFile: (pathname, content) =>
    writeFile(pathname, JSON.stringify(content, null, 2)),
};
