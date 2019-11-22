const {makeQuestions} = require('../../common/inquirer');
const {successMessage, errorMessage, createSpinner} = require('../../common/bash');
const {getPullQuestions} = require('./questions');
const GitService = require('./service');

module.exports = {
  pull: async () => {
    const spinner = createSpinner('pulling changes...');
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

      spinner.start();
      git.pull(
        remote,
        branch,
        successMessage('The changes has been pulled successfully')
      );
      spinner.stop();
    } catch (err) {
      spinner.stop();
      errorMessage(err.message);
    }
  },
};
