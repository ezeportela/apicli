const exec = require('child_process').exec;

const _exec = (command) => new Promise((resolve, reject) =>
  exec(command, (error, out) => {
    if (error) return reject(error);
    
    return resolve(out);
  })
);

const execCommand = (command) => _exec(command.join(' '));

module.exports = execCommand;
