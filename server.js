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
    const sql = `SELECT e.first_name, e.last_name, e.role_id, r.title, d.department_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    JOIN roles r ON e.role_id = r.id
    JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id;
    `;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
      }else{
        console.table(rows)
        init()
        }
    });
}


let rolesList
let ManagersList
let departmentList

function databaseToArray(){
  const sql = `SELECT * FROM roles` ;
  db.query(sql, (err, res) => {
    if (err) {
      console.log({ error: err.message });
    }else{
      let values = res.map(row => row.title);
      let string = values.toString()
      rolesList = string.split(',');
      }
  });
}

function managerToArray(){
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log({ error: err.message });
    }else{
      let values = res.map(row => row.first_name +' '+ row.last_name);
      let string = values.toString()
      ManagersList = string.split(',');
      }
  });
}

function departmentToArray(){
  const sql = `SELECT * FROM departments` ;
  db.query(sql, (err, res) => {
    if (err) {
      console.log({ error: err.message });
    }else{
      let values = res.map(row => row.department_name);
      let string = values.toString()
      departmentList = string.split(',');
      }
  });
}


departmentToArray()
databaseToArray()
managerToArray()

// code to add an employee
function addEmployee(){
    databaseToArray()
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
  inquirer.prompt([
    {
        type: "list",
        name: "employee",
        message: "Which employee's role do you want to update?",
        choices: ManagersList
    },
      {
        type: "list",
        name: "role",
        message: "Which role do you want to assign the selected employee?",
        choices: rolesList 
      }
    ])
    .then((response) => {
      const query = `SELECT id FROM roles WHERE title='${response.role}';`
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
          const sql = `UPDATE employees SET role_id ='${roleId}' WHERE first_name= '${response.employee.split(' ')[0]}';`
          db.query(sql, (err, res) => {
            if (err) {
              console.log({ error: err.message });
            }else{
              console.log('Role updated!')
              init()
              }
          })

      }).catch(error => {
        console.log({ error: error.message });
      });
    })
    .catch((error) => {
      console.log(error)
    })

}

// code to view all roles
function viewAllRoles(){
    databaseToArray()
    const sql = `SELECT r.id, r.title, d.department_name, r.salary
    FROM roles r
    JOIN departments d ON r.department_id = d.id
    JOIN employees e ON r.id = e.role_id;
    `;
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
  departmentToArray()
  inquirer.prompt([{
    type: "input",
    name: "role_name",
    message: "What is the name of the role?",
    validate: firstName => {
      if (firstName) {
        return true;
      } else {
        console.log('Please enter the role name.');
        return false;
      }}
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role?",
      validate: name => {
      if (name) {
        return true;
      } else {
        console.log('Please enter the salary.');
        return false;
      }}
    },
    {
      type: "list",
      name: "department_role",
      message: "Which department does the role belong to?",
      choices: departmentList
    }
  ])
  .then((response) => {
    var dArray = [response.role_name, response.salary]
    const depatmentquery = `SELECT id FROM departments WHERE department_name='${response.department_role}';`
    const getdepartmentId = new Promise((resolve, reject) => {
    db.query(depatmentquery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const departmentId = results[0].id;
        resolve(departmentId);
        
      }
  });
  });
    getdepartmentId.then(departmentId => {
      const sql = `INSERT INTO roles (title, salary, department_id)
      VALUES ('`+dArray[0]+`', '`+dArray[1]+`', `+departmentId+`);`
      db.query(sql, (err, res) => {
        if (err) {
          console.log({ error: err.message });
        }else{
          console.log('Role added!')
          init()
          }
      });
    }).catch(error => {
      console.log({ error: error.message });
    });
  })
  .catch((error) => {
  console.log(error)
  })
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
    
  inquirer.prompt([{
    type: "input",
    name: "name",
    message: "What is the name of the department?",
    validate: firstName => {
      if (firstName) {
        return true;
      } else {
        console.log('Please enter the department name.');
        return false;
      }}
    }
  ])
  .then((response) => {
    const sql = `INSERT INTO departments (department_name)
    VALUES ('${response.name}');`
    db.query(sql, (err, res) => {
      if (err) {
        console.log({ error: err.message });
      }else{
        console.log('Department added!')
        init()
        }
    });
  })
  .catch((error) => {
  console.log(error)
  })
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
