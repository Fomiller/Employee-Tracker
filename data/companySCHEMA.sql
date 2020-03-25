DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
    id INT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_title VARCHAR(30) NULL,
    role_id INT,
    manager_id INT 
);

-- Set employee.role_id to reference role.id
ALTER TABLE employee
ADD FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL;

-- Set employee.manager_id to reference a sepcific employee.id
ALTER TABLE employee
ADD FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL;
