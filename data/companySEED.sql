DELETE FROM employee;
DELETE FROM department;
DELETE FROM role;

-- Creating all Departments.
-- Create this first because it does not have any foreign keys
INSERT INTO department VALUES (1, 'Corporate');
INSERT INTO department VALUES (2, 'Texas');
INSERT INTO department VALUES (3, 'Tennessee');
INSERT INTO department VALUES (4, 'Mexico');

-- ==========================================================================
-- Create Roles second because they depend on Departments for foreign keys.
-- PRESIDENT ROLES
INSERT INTO role VALUES (1, 'CEO', 1000000.00, 1);
INSERT INTO role VALUES (2, 'President', 150000.00, 2);
INSERT INTO role VALUES (3, 'President', 150000.00, 3);
INSERT INTO role VALUES (4, 'President', 150000.00, 4);

-- MANAGER ROLES
INSERT INTO role VALUES (11, 'Manager', 98000.00, 2);
INSERT INTO role VALUES (12, 'Manager', 98000.00, 3);
INSERT INTO role VALUES (13, 'Manager', 98000.00, 4);

-- ENGINEER ROLES
INSERT INTO role VALUES (21, 'Engineer', 75000.00, 2);
INSERT INTO role VALUES (22, 'Engineer', 75000.00, 3);
INSERT INTO role VALUES (23, 'Engineer', 75000.00, 4);

-- Interns ROLES
INSERT INTO role VALUES (51, 'Intern', 50000.00, 2);
INSERT INTO role VALUES (52, 'Intern', 50000.00, 3);
INSERT INTO role VALUES (53, 'Intern', 50000.00, 4);

-- ==========================================================================
-- Create employees last becasue they rely on roles to be created

-- CEO
INSERT INTO employee VALUES (100, 'Forrest', 'Miller', 1, NULL);
-- PRESIDENT's
INSERT INTO employee VALUES (101, 'Stephen', 'Heinen', 2, 100);
INSERT INTO employee VALUES (102, 'Ryan', 'Lara', 3, 100);
INSERT INTO employee VALUES (103, 'Emil', 'Shabib', 4, 100);

-- MANAGER's
INSERT INTO employee VALUES (201, 'Tom', 'Hanks', 11, 101);
INSERT INTO employee VALUES (202, 'Joe', 'Rogan', 12, 102);
INSERT INTO employee VALUES (203, 'Barrack', 'Obama', 13, 103);


-- ENGINEER's
-- Texas
INSERT INTO employee VALUES (301, 'Jeff', 'Grape', 21, 201);
INSERT INTO employee VALUES (304, 'Paul', 'Kiwi', 21, 201);
INSERT INTO employee VALUES (307, 'Jim', 'Pear', 21, 201);
-- Tennessee
INSERT INTO employee VALUES (302, 'Dave', 'Peach', 22, 202);
INSERT INTO employee VALUES (305, 'Mark', 'Apple', 22, 202);
INSERT INTO employee VALUES (308, 'Simon', 'Mango', 22, 202);
-- Mexico
INSERT INTO employee VALUES (303, 'Derrick', 'Clementine', 23, 203);
INSERT INTO employee VALUES (306, 'Max', 'Orange', 23, 203);
INSERT INTO employee VALUES (309, 'Ralph', 'Melon', 22, 203);


-- INTERNS
-- Texas
INSERT INTO employee VALUES (501, 'Timmy', 'Birch', 51, 301);
INSERT INTO employee VALUES (505, 'Jeremy', 'Oak', 51, 301);
-- Tennessee
INSERT INTO employee VALUES (502, 'Jimmy', 'Oak', 52, 302);
INSERT INTO employee VALUES (506, 'Brody', 'Cedar', 52, 302);
-- Mexico
INSERT INTO employee VALUES (503, 'Pauly', 'Cedar', 53, 303);
INSERT INTO employee VALUES (504, 'Jeffery', 'Birch', 53, 303);
