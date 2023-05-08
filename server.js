const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Reishi99ga!',
      database: 'company_db'
    },
    console.log(`Connected to the compay_db database.`)
  );


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
            viewAllEmployee()
            break;
        case 'Add Employee':
            addEmployee()
            break;
        case 'Update Employee Role':
            updateEmployeeRole()
            break;
        case 'View All Roles':
            viewAllRoles()
            break;
        case 'Add Role':
            addRole()
            break;
        case 'View All Departments':
            viewAllDepartments()
            break;
        case 'Add Department':
            addDepartment()
            break;
        case 'Quit':
            console.log('Goodbye')
            break;
        default:
            console.log('Invalid question');
            break;
    }
}

// code to view all employees
function viewAllEmployee() {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
      }else{
        console.table(rows)
        init()
        }
    });
}

// code to add an employee
function addEmployee(){
    init()  
}

// code to update an employee's role
function updateEmployeeRole(){
    init()
}

// code to view all roles
function viewAllRoles(){
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
      }else{
        console.table(rows)
        init()
        }
    });
}

// code to add a role
function addRole(){
    init()
}

// code to view all departments
function viewAllDepartments(){
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
      }else{
        console.table(rows)
        init()
        }
    });
}

// code to add a department
function addDepartment(){
    init()
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
