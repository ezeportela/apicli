const {makeQuestions} = require('../../common/inquirer');
const {successMessage, errorMessage} = require('../../common/message');
const {getPullQuestions} = require('./questions');
const GitService = require('./service');

module.exports = {
  pull: async () => {
    try {
      const git = new GitService();

      const branches = await git.getBranches();
      const remotes = await git.getRemotes();

      const result = await makeQuestions(
        getPullQuestions(
          branches.all,
          remotes.map((remote) => remote.name),
        ),
      );

      const {
        remote,
        branch,
      } = result;

      git.pull(
        remote,
        branch,
        successMessage('The changes has been pulled successfully')
      );
    } catch (err) {
      errorMessage(err.message);
    }
  },
};
