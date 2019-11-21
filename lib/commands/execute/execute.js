const exec = require('../../common/exec');
const {errorMessage} = require('../../common/message');

const execute = async (options) => {
  try {
    const commands = [];
    
    if (options.ports) commands.push(['lsof -i -P -n | grep LISTEN']);

    for (const command of commands) {
      const result = await exec(command);
      console.log(result);
    }
  } catch (err) {
    errorMessage(err);
  }
}

module.exports = {execute};
