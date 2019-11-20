const simpleGit = require('simple-git');
const {makeQuestions} = require('../../common/inquirer');

const files = require('../../common/files');
const {successMessage, errorMessage} = require('../../common/message');
const {getPullQuestions} = require('./questions');
const {getBranches, getRemotes} = require('./functions');

module.exports = {
  pull: async () => {
    try {
      const git = simpleGit(files.getCurrentDirectoryBase());

      const branches = await getBranches(git);
      const remotes = await getRemotes(git);

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

      git
        .checkout(branch)
        .pull(remote, branch)
        .exec(successMessage('The changes has been pulled successfully'));
    } catch (err) {
      errorMessage(err.message);
    }
  },
};
