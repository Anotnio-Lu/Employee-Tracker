INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 52, 105),
       ("Bob", "Lee", 53, 102),
       ("Todd", "Lee", 54, 104);
          

INSERT INTO departments (id, department_name)
VALUES (1, "Sales"),
       (2, "Marketing"),
       (3, "Operations"),
       (4, "Customer Service");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (101, "Sales Clerk", 80000, 1),
        (102, "Sales Manager", 150000, 1),
        (103, "Marketing Clerk", 70000, 2),
        (104, "Marketing Manager", 150000, 2),
        (105, "General Manager", 200000, 3);

