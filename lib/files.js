const fs = require('fs');
const path = require('path');

const getCurrentDirectoryBase = () => process.env.PWD; // path.basename(process.cwd());

const getFilePath = (pathname) => `${getCurrentDirectoryBase()}${pathname}`;

module.exports = {
  getCurrentDirectoryBase,
  getFilePath,
  readFile: (pathname) => fs.readFileSync(getFilePath(pathname), 'utf8'),

  writeFile: (pathname, content) => fs.writeFileSync(getFilePath(pathname), content),
};
