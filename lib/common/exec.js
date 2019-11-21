const exec = require('child_process').exec;

module.exports = {
  exec: (command) => new Promise((resolve, reject) =>
    exec(command, (error, out) => {
      if (error) return reject(error);
      
      return resolve(out);
    })
  ),
};

