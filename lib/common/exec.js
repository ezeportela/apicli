const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

const _exec = (command) => exec(command);

const execCommand = (command) => _exec(command.join(' '));

module.exports = execCommand;
