var inquirer = require('inquirer');
var fs = require('fs');
const generatePage = require('./template-page');
// array of questions for user
const promptUser = () => {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name?',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name.');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'github',
          message: 'Enter your GitHub Username',
          validate: githubInput => {
            if (githubInput) {
              return true;
            } else {
              console.log('Please enter your GitHub Username.');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself:'
        },
        {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "About" section?',
          default: true
        },
        {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself:',
          when: ({ confirmAbout }) => confirmAbout
        }
      ]);
    };
const promptProject = portfolioData => {

    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }
    
      console.log(`
      =================
      Add A New Project
      =================
      `);
      return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter the name of your project.');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please enter a project description.');
              return false;
            }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you make this project with? (Check all that apply)',
          choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project (Required)',
          validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('Please enter the link to your GitHub Repository.');
              return false;
            }
          }
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }
      ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
    };

// function to write README file
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
  fs.writeFile('./README.md', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('README created! Checkout README.mmd in this directory to see it!');
  });
});

// function to initialize program
// function init() {}

// function call to initialize program
// init();
