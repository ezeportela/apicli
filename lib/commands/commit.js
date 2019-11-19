const git = require('simple-git');
const {askCommit} = require('../inquirer');


module.exports = {
  commit: async () => {
    const result = await askCommit();
    
    git().add('.')
      .commit(result.message)
      .push(result.remote, result.branch);
  },
};
