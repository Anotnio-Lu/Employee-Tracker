const inquirer = require('inquirer');

const questions = [
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices:['View All Employees', 
        'Add Employee', 
        'Update Employee Role', 
        'View All Roles', 
        'Add Role', 
        'View All Departments', 
        'Add Department',
        'Quit'
        ]
    },
]

function responder(input){
    switch (input) {
        case 'View All Employees':
            // code to view all employees
            break;
        case 'Add Employee':
            // code to add an employee
            break;
        case 'Update Employee Role':
            // code to update an employee's role
            break;
        case 'View All Roles':
            // code to view all roles
            break;
        case 'Add Role':
            // code to add a role
            break;
        case 'View All Departments':
            // code to view all departments
            break;
        case 'Add Department':
            // code to add a department
            break;
        case 'Quit':
            console.log('Goodbye')
            break;
        default:
            console.log('Invalid question');
            break;
        }
    }

function init() {
    inquirer.prompt(questions)
    .then((response) => {
      responder(response.choice)
    })
    .catch((error) => {
      console.log(error)
    })
}

// Function call to initialize app
init();
