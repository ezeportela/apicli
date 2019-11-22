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

  getNewVersions(pkg) {
    const versions = pkg.version
      .concat(',')
      .repeat(3)
      .split(',')
      .filter((str) => str)
      .map((ver) => ver.split('.'))
      .map((list) => list.map((ver) => parseInt(ver)));

    // patch
    versions[0][2]++;

    // minor
    versions[1][2] = 0;
    versions[1][1]++;

    // major
    versions[2][2] = 0;
    versions[2][1] = 0;
    versions[2][0]++;

    return [
      `${versions[0].join('.')} (patch)`,
      `${versions[1].join('.')} (minor)`,
      `${versions[2].join('.')} (major)`,
    ];
  }

  async changeAppVersion(pkg, version) {
    pkg.version = version;
    await files.writeJsonFile('/package.json', pkg);
  }
}

module.exports = GitService;