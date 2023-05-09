# SQL Challenge: Employee Tracker

This is a command-line application built from scratch using Node.js, Inquirer, and MySQL. It allows you to manage a company's employee database by providing options to view and manage departments, roles, and employees.

## User Story
- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business


## Acceptance Criteria
- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database


## Approach
To build this application, we started by analyzing the requirements and identifying the necessary technologies to fulfill them. We chose Node.js as the runtime environment, Inquirer for the command-line interface, and MySQL for the database management system.

Next, we designed the database schema to store departments, roles, and employees, ensuring the necessary relationships and constraints were in place. We created the necessary tables and set up the database connection within the application.

After setting up the database, we focused on implementing the logic to handle user input. We utilized Inquirer to provide a user-friendly interface with options for viewing and managing the employee database. We implemented the functionality for each option, such as viewing departments, roles, and employees, as well as adding new departments, roles, employees, and updating employee roles.

Once the core functionality was implemented, we thoroughly tested the application to ensure it met the acceptance criteria and functioned correctly in different scenarios. We made any necessary adjustments to improve the user experience and handle potential errors.

## Completed tasks
- Analyzed requirements and selected appropriate technologies
- Designed the database schema
Created the necessary tables and set up the database connection
- Implemented logic to handle user input using Inquirer
- Added functionality to view departments, roles, and employees
- Implemented adding departments, roles, and employees
- Added functionality to update employee roles
- Tested the application and made necessary adjustments

## Conclusion
In conclusion, this command-line application provides a convenient and efficient way to manage a company's employee database. It fulfills the user story and meets the acceptance criteria by allowing users to view and manage departments, roles, and employees. With this application, business owners can organize and plan their businesses effectively.



## Link

The below is a link to the walkthrough video: 

https://www.loom.com/share/125f80957a114d28bf07a4f90b218f60

## Authors

- [Anotnio Lu](https://github.com/Anotnio-Lu)


## License

This project is licensed under MIT License.
