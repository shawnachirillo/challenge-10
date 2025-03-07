INSERT INTO department (name)
VALUES ('Marketing'),
       ('Sales'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager of Marketing',247328,1),
       ('Marketing Specialist', 123664, 1),
       ('Sales Manager', 234000, 2),
       ('Sales Associate', 100000, 2),
       ('Finance Manager', 200000, 3),
       ('Accountant', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, NULL),
       ('Jim', 'Smith', 3, NULL),
       ('Jack', 'Johnson', 5, NULL),
       ('Jill', 'Smith', 4, 25),
       ('Jane', 'Doe', 2, 26),
       ('Jill', 'Johnson', 6, 27);
       
