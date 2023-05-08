INSERT INTO departments (id, department_name)
VALUES (1, 'Sales'),
       (2, 'Marketing'),
       (3, 'Operations'),
       (4, 'Customer Service');

INSERT INTO roles (id, title, salary, department_id)
VALUES  (101, 'Sales Clerk', 80000.00, 1),
        (102, 'Sales Manager', 150000.00, 1),
        (103, 'Marketing Clerk', 70000.00, 2),
        (104, 'Marketing Manager', 150000.00, 2),
        (105, 'General Manager', 200000.00, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (111, 'John', 'Smith', 101, 111),
       (112, 'Bob', 'Lee', 103, 111),
       (113, 'Todd', 'Lee', 104, 111),
       (100, 'Tommy', 'Do', 105, 111);