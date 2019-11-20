const getCommitQuestions = (versionList, branchesList, remoteList) => [
  {
    name: 'version',
    type: 'list',
    choices: versionList,
    message: 'New version:',
  },
  ...getPullQuestions(branchesList, remoteList),
  {
    name: 'message',
    type: 'input',
    message: 'Enter a message to commit:',
    validate: (value) => value.length ? true : 'Please enter a message.',
  },
];

const getPullQuestions = (branchesList, remoteList) => [
  {
    name: 'branch',
    type: 'list',
    choices: branchesList,
    message: 'Enter a local branch:',
    validate: (value) => value.length ? true : 'Please enter a local branch.',
  },
  {
    name: 'remote',
    type: 'list',
    choices: remoteList,
    message: 'Enter a remote branch to commit:',
    validate: (value) => value.length ? true : 'Please enter a remote branch.',
  },
];

module.exports = {
  getCommitQuestions,
  getPullQuestions,
};
