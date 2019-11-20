const getBranches = (git) => new Promise((resolve, reject) => {
  git.branchLocal((err, branches) => {
    if (err) return reject(err);

    return resolve(branches);
  });
});

const getRemotes = (git) => new Promise((resolve, reject) => {
  git.getRemotes((err, remotes) => {
    if (err) return reject(err);

    return resolve(remotes);
  });
});

module.exports = {
  getBranches,
  getRemotes,
};
