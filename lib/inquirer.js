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
};