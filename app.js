const DB = require("./data/connection");
var mysql = require("mysql");
const figlet = require("./figlet.js");
const { prompt } = require("inquirer");
const util = require("util");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "527996",
    database: "company_db"
});
const connectAsync = util.promisify(connection.connect).bind(connection);
const queryAsync = util.promisify(connection.query).bind(connection);
// figlet.writeText();

const actions = {
	generateDepartments: async function (q){
		const departments = await q("SELECT name FROM department");
		return departments.map(dept => dept.name);
	},
	addEmployee: async function (q) {
		try {
			const questions = [
				{
					name: "id",
					type: "input",
					message: "Enter employees id number.", 
				},
				{
					name: "firstName",
					type: "input",
					message: "Enter employees first name.", 
				},
				{
					name: "lastName",
					type: "input",
					message: "Enter employees last name."
				},
				{
					name: "role",
					type: "list",
					message: "What is this employees role?",
					choices: [
						{value: "11", name: "Manager"},
						{value: "21", name: "Engineer"},
						{value: "22", name: "Marketing"},
						{value: "51", name: "Intern"},
						{value: "8", name: "Janitor"},
					]
				},
				{
					name: "manager",
					type: "list",
					message: "who is their manager?",
					// loop of all managers...
					choices: [
						{value: "101", name: "Stephen"},
						{value: "102", name: "Ryan"},
						{value: "103", name: "Emil"},
						{value: "201", name: "Tom"},
						{value: "203", name: "Joe"},
					]
				}];
			const { id, firstName, lastName, role, manager } = await prompt(questions);
			q("INSERT INTO employee SET ?",{id: id, first_name: firstName, last_name: lastName, role_id: role, manager_id: manager});
		} catch (err) {
			throw err;
		}
	},
	removeEmployee: async function (q) {
		try{
			const questions = {
				name: "id",
				type: "input",
				message: "enter the employees id."
			}
			const { id } = await prompt(questions);
			q("DELETE FROM employee WHERE ?",{ id: id,});
		} catch (err) {
			throw err;
		}
	},
	allEmployees: async function(q) {
		const employees = await q("SELECT * FROM employee");
		console.table("All Employees", employees);
	},
}


async function init() {
	try{
		await connectAsync();
		runApp(queryAsync);
	} catch (err) {
		throw err;
	}
}

async function runApp(query) {
	try {
		const question = {
			name: "input",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				{value: 'allEmployees', name: "View all employees."},
				{value: 'empByDepartment', name: "View employees by department."},
				{value: 'empByManager', name: "View all employees by manager."},
				{value: 'addEmployee', name: "Add employee."},
				{value: 'removeEmployee', name: "Remove employee."},
				{value: 'updateRole', name: "Update an employees role."},
				{value: 'updateManager', name: "Update an employees manager."},
			]
		};
		const { input } = await prompt(question);
		await actions[input](query)
		runApp(query);
	} catch (err) {
		throw err;
	}
};

// actions.generateDepartments(queryAsync);

// init();























// Display project title

// DB.createEmployee(850, "Johnny", "Bravo", 8, 202);
// DB.createDepartment(8,"Europe");
// DB.createRole(8,"Janitor", 25000.00, 8)
// DB.deleteEmployee("Johnny");

// DB.updateRole(4, "Johnny");

// DB.readDepartment();
// DB.readRole();
// DB.readEmployee();

// console.log(DB);
