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

// function databaseToArray(input, table){
//   const sql = `SELECT ` + input + ` FROM ` + table;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log({ error: err.message });
//     }else{
//       const values = res.map(row => row.input);
//       return values
//       }
//   });
// }

let rolesList
let ManagersList

function databaseToArray(){
  const sql = `SELECT * FROM roles` ;
  db.query(sql, (err, res) => {
    if (err) {
      console.log({ error: err.message });
    }else{
      const values = res.map(row => row.title);
      let string = values.toString()
      rolesList = string.split(',');
      }
  });
}

function managerToArray(){
  const sql = `SELECT * FROM employees` ;
  db.query(sql, (err, res) => {
    if (err) {
      console.log({ error: err.message });
    }else{
      const values = res.map(row => row.first_name +' '+ row.last_name);
      let string = values.toString()
      ManagersList = string.split(',');
      }
  });
}

databaseToArray()
managerToArray()

// code to add an employee
function addEmployee(){
    inquirer.prompt([{
        type: "input",
        name: "employee_firstname",
        message: "Enter the employee's first name:",
        validate: firstName => {
          if (firstName) {
            return true;
          } else {
            console.log('Please enter the first name of the employee.');
            return false;
          }}
        },
        {
          type: "input",
          name: "employee_lastname",
          message: "Enter the employee's last name:",
          validate: name => {
            if (name) {
              return true;
            } else {
              console.log('Please enter the last name of the employee.');
              return false;
            }}
        },
        {
            type: "list",
            name: "employee_role",
            message: "What is the employee's role:",
            choices: rolesList
        },
          {
            type: "list",
            name: "employee_name",
            message: "Who is the employee's manager?",
            choices: ManagersList
          },

        ])
    .then((response) => {
      var array = [response.employee_firstname, response.employee_lastname]

      const roleTitle = `${response.employee_role}`;

      const query = `SELECT id FROM roles WHERE title='${response.employee_role}';`
      const getRoleId = new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            const roleId = results[0].id;
            resolve(roleId);
          }
        });
      });
      getRoleId.then(roleId => {
        let managersFirst = response.employee_name.split(' ');
        const getManagerId = new Promise((resolve, reject) => {
          const managerquery = `SELECT id FROM employees WHERE first_name='`+managersFirst[0]+`';`
          db.query(managerquery, (err, results) => {
            if (err) {
              console.log({ error: err.message });
            }else{
              const managerId = results[0].id;
              resolve(managerId);
              }
          })
        })
        getManagerId.then(res => {

          const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
          VALUES ('`+array[0]+`', '`+array[1]+`', `+roleId+`, `+res+`);`
          db.query(sql, (err, res) => {
            if (err) {
              console.log({ error: err.message });
            }else{
              console.log('Employee added!')
              init()
              }
          });
        })

      }).catch(error => {
        console.log({ error: error.message });
      });
    })
    .catch((error) => {
      console.log(error)
    })
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
