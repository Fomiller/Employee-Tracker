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
	generateDepartments: async function (q) {
		const departments = await q("SELECT name FROM department");
		return departments.map(dept => dept.name);
	},
	generateManagers: async function (q) {
		const managers = await q("SELECT id, first_name, last_name FROM employee WHERE role_title = \"Manager\"");
		// const test = managers.map(manager => manager.id + manager.first_name + " " + manager.last_name );
		var managerValues = managers.map(manager => {
			const managerContainer = {};
			managerContainer.value = manager.id;
			managerContainer.name = manager.first_name + " " + manager.last_name;	
			return managerContainer;
		});
		return managerValues;
	},
	generateRoles: async function (q) {
		const roles = await q("SELECT * FROM role")
		var roleValues = roles.map(role => {
			const roleContainer = {};
			roleContainer.value = role.id;
			roleContainer.name = role.title;	
			return roleContainer;
		});
		return roleValues;
	},
	addEmployee: async function (q) {
		const roleList = await this.generateRoles(q);
		const managerList = await this.generateManagers(q);
		try {
			const questions = [
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
					choices: roleList
				},
				// {
				// 	name: "manager",
				// 	type: "list",
				// 	message: "Who is their manager?",
				// 	choices: managerList
				// }
			];
			const { firstName, lastName, role, manager,} = await prompt(questions);
			const { name: role_title } = await roleList.find(o => o.value === role);
			q("INSERT INTO employee SET ?",{first_name: firstName, last_name: lastName, role_title: role_title, role_id: role, manager_id: manager});
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
	allDepartments: async function(q) {
		const departments = await q("SELECT * FROM department");
		console.table("All Departments", departments);
	},
	allRoles: async function(q) {
		const roles = await q("SELECT * FROM role");
		console.table("All Roles", roles);
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
				{value: 'allDepartments', name: "View all departments."},
				{value: 'allRoles', name: "View all roles."},
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


// actions.generateRoles(queryAsync);
// actions.generateManagers(queryAsync);

init();