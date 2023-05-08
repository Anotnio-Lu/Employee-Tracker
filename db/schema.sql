DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT PRIMARY KEY NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)

);

CREATE TABLE employees (
  id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id),
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
);
