-- DELETE FROM employee;
-- DELETE FROM department;
-- DELETE FROM role;

USE company_db;
-- Creating all Departments.
-- Create this first because it does not have any foreign keys
INSERT INTO department (name) VALUES ('Corporate');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('I.T.');

-- ==========================================================================
-- Create Roles second because they depend on Departments for foreign keys.
-- PRESIDENT ROLES
INSERT INTO role (title, salary, department_id) VALUES ('CEO', 1000000.00, 1);


-- MANAGER ROLES
INSERT INTO role (title, salary, department_id) VALUES ('Engineering Manager', 98000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', 98000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('I.T. Manager', 98000.00, 4);

-- ENGINEER ROLES
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 75000.00, 2);

-- MARKETING ROLES
INSERT INTO role (title, salary, department_id) VALUES ('Marketer', 75000.00, 3);

-- IT ROLES
INSERT INTO role (title, salary, department_id) VALUES ('I.T.', 75000.00, 4);

-- Interns ROLES
INSERT INTO role (title, salary, department_id) VALUES ('Intern', 50000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Intern', 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Intern', 50000.00, 4);

-- ==========================================================================
-- Create employees last becasue they rely on roles to be created
-- USE company_db;
-- CEO
INSERT INTO employee (first_name, last_name, role_title, role_id) VALUES ('Forrest', 'Miller', 'CEO',1);

-- MANAGER's
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Stephen', 'Heinen', 'Engineering Manager', 2, 1);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Ryan', 'Lara', 'Marketing Manager', 3, 1);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Emil', 'Shabib', 'I.T. Manager', 4, 1);

-- ENGINEER's
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Jeff', 'Grape', 'Engineer', 5, 2);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Paul', 'Kiwi', 'Engineer', 5, 2);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Jim', 'Pear', 'Engineer', 5, 2);

-- MARKETERS
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Dave', 'Peach', 'Marketer', 6, 3);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Mark', 'Apple', 'Marketer', 6, 3);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Simon', 'Mango', 'Marketer', 6, 3);

-- IT
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Derrick', 'Clementine', 'I.T.', 7, 4);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Max', 'Orange', 'I.T.', 7, 4);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Ralph', 'Melon', 'I.T.', 7, 4);


-- INTERNS
-- Engineering
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Timmy', 'Birch', 'Intern', 8, 2);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Jeremy', 'Oak', 'Intern', 8, 2);
-- Marketing
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Jimmy', 'Oak', 'Intern', 9, 3);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Brody', 'Cedar', 'Intern', 9, 3);
-- I.T.
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Pauly', 'Cedar', 'Intern', 10, 4);
INSERT INTO employee (first_name, last_name, role_title, role_id, manager_id) VALUES ('Jeffery', 'Birch', 'Intern', 10, 4);
