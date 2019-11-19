const inquirer = require('inquirer');

module.exports = {
  askGenerate: () => {
    const questions = [
      {
        type: 'list',
        name: 'generate',
        message: 'What do you want to generate?:',
        choices: [
          'config',
          'routes',
          'http services',
        ],
        default: 'config'
      },
    ];

    return inquirer.prompt(questions);
  },

  askCommit: () => {
    const questions = [
      {
        type: 'input',
        name: 'branch',
        message: 'Enter a local branch:',
        default: 'dev',
        validate: (value) => value.length ? true : 'Please enter a local branch.',
      },
      {
        type: 'input',
        name: 'remote',
        message: 'Enter a remote branch to commit:',
        default: 'origin',
        validate: (value) => value.length ? true : 'Please enter a remote branch.',
      },
      {
        type: 'input',
        name: 'message',
        message: 'Enter a message to commit:',
        validate: (value) => value.length ? true : 'Please enter a message.',
      },
    ];

    return inquirer.prompt(questions);
  },
};