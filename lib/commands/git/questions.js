const {inputQuestion, listQuestion} = require('../../common/inquirer');

const getCommitQuestions = (versionList, branchesList, remoteList) => [
  listQuestion('version', 'New Version:', versionList),
  ...getPullQuestions(branchesList, remoteList),
  inputQuestion('message', 'Enter a message to commit:'),
];

const getPullQuestions = (branchesList, remoteList) => [
  listQuestion('branch', 'Enter a local branch:', branchesList),
  listQuestion('remote', 'Enter a remote branch to commit:', remoteList),
];

module.exports = {
  getCommitQuestions,
  getPullQuestions,
};
