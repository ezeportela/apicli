const fs = require('fs');
const path = require('path');

const getCurrentDirectoryBase = () => process.env.PWD; // path.basename(process.cwd());
const getFilePath = (pathname) => `${getCurrentDirectoryBase()}${pathname}`;
const writeFile = (pathname, content) => fs.writeFileSync(getFilePath(pathname), content);

module.exports = {
  getCurrentDirectoryBase,
  getFilePath,
  readFile: (pathname) => fs.readFileSync(getFilePath(pathname), 'utf8'),
  writeFile,
  writeJsonFile: (pathname, content) => writeFile(pathname, JSON.stringify(content, null, 2)),
};
