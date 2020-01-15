const {makeQuestions} = require('../../common/inquirer');
const files = require('../../common/files');
const {
  successMessage,
  errorMessage,
  createSpinner,
} = require('../../common/bash');
const {getCommitQuestions} = require('./questions');
const GitService = require('./service');

module.exports = {
  commit: async () => {
    const spinner = createSpinner('commiting changes...');
    const package = require(files.getFilePath('/package.json'));
    const currentVersion = package.version;
    const git = new GitService();

    try {
      const versions = git.getNewVersions(package);
      const branches = await git.getBranches();
      const remotes = await git.getRemotes();

      const result = await makeQuestions(
        getCommitQuestions(
          versions,
          branches.all,
          remotes.map((remote) => remote.name),
        ),
      );

      const {version, message, remote, branch} = result;

      const newVersion = version.match(/[\d.]+/g);
      git.changeAppVersion(package, newVersion[0]);

      spinner.start();
      git.commit(remote, branch, message, () => {
        spinner.stop();
        successMessage('The changes has been commited successfully');
      });
    } catch (err) {
      spinner.stop();
      git.changeAppVersion(package, currentVersion);
      errorMessage(err.message);
    }
  },
};
