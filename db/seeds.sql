INSERT INTO departments (department_name)
VALUES ('Sales'),
       ('Marketing'),
       ('Operations'),
       ('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Clerk', 80000.00, 1),
        ('Sales Manager', 150000.00, 1),
        ('Marketing Clerk', 70000.00, 2),
        ('Marketing Manager', 150000.00, 2),
        ('General Manager', 200000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Tommy', 'Doe', 2, NULL),
        ('John', 'Smith', 4, NULL),
        ('Bob', 'Lee', 5, NULL);