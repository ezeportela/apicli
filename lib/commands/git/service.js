const simpleGit = require('simple-git');
const files = require('../../common/files');

class GitService {
  constructor() {
    this.git = simpleGit(files.getCurrentDirectoryBase());
  }

  getBranches() {
    return new Promise((resolve, reject) => {
      this.git.branchLocal((err, branches) => {
        if (err) return reject(err);
    
        return resolve(branches);
      });
    });
  }
  
  getRemotes() {
    return new Promise((resolve, reject) => {
      this.git.getRemotes((err, remotes) => {
        if (err) return reject(err);
    
        return resolve(remotes);
      });
    });
  }

  commit(remote, branch, message, success) {
    this.git
      .add('.')
      .commit(message)
      .push(remote, branch)
      .exec(success);
  }

  pull(remote, branch, success) {
    this.git
      .checkout(branch)
      .pull(remote, branch)
      .exec(success);
  }
}

module.exports = GitService;
