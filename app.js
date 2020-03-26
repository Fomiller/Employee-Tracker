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
		const departments = await q("SELECT * FROM department");
		var departmentValues = await departments.map(department => {
			const departmentContainer = {};
			departmentContainer.value = department.id;
			departmentContainer.name = department.name;	
			return departmentContainer;
		});
		return departmentValues;
	},
	generateManagers: async function (q) {
		var managers = await q("SELECT id, first_name, last_name FROM employee WHERE role_title LIKE ?", ['%manager%']);
		var managerValues = await managers.map(manager => {
			const managerContainer = {};
			managerContainer.value = manager.id;
			managerContainer.name = manager.first_name + " " + manager.last_name;	
			return managerContainer;
		});
		return managerValues;
	},
	generateRoles: async function (q) {
		var roles = await q("SELECT * FROM role")
		var roleValues = await roles.map(role => {
			const roleContainer = {};
			roleContainer.value = role.id;
			roleContainer.name = role.title;	
			return roleContainer;
		});
		return roleValues;
	},
	generateEmployees: async function (q) {
		var employees = await q("SELECT * FROM employee")
		var employeeValues = await employees.map(employee => {
			const employeeContainer = {};
			employeeContainer.value = employee.id;
			employeeContainer.name = employee.first_name + " " + employee.last_name;	
			return employeeContainer;
		});
		return employeeValues;
	},
	addEmployee: async function (q) {
		var roleList = await this.generateRoles(q);
		var managerList = await this.generateManagers(q);
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
				{
					name: "manager",
					type: "list",
					message: "Who is their manager?",
					choices: managerList
				}
			];
			const { firstName, lastName, role, manager,} = await prompt(questions);
			const { name: role_title } = await roleList.find(o => o.value === role);
			q("INSERT INTO employee SET ?",{first_name: firstName, last_name: lastName, role_title: role_title, role_id: role, manager_id: manager});
		} catch (err) {
			throw err;
		}
	},
	addDepartment: async function (q) {
		try{
			const questions = {
				name: "department",
				type: "input",
				message: "enter the name of the Department."
			}
			const { department } = await prompt(questions);
			q("INSERT INTO department SET ?",{name: department});
		} catch (err) {
			throw err;
		}
	},
	addRole: async function (q) {
		var departmentList = await this.generateDepartments(q);
		try{
			const questions = [
				{
				name: "title",
				type: "input",
				message: "enter the name of the Role."
				},
				{
				name: "salary",
				type: "input",
				message: "What is the salary of this position."
				},
				{
				name: "department",
				type: "list",
				message: "which department do does this role work for?",
				choices: departmentList
				},
			]
			const { title, salary, department } = await prompt(questions);
			q("INSERT INTO role SET ?",{title: title, salary: salary, department_id: department});
		} catch (err) {
			throw err;
		}
	},
	removeEmployee: async function (q) {
		var employeeList = await this.generateEmployees(q);
		try{
			const questions = {
				name: "employee",
				type: "list",
				message: "Which employee would you like to remove?",
				choices: employeeList
			}
			const { employee } = await prompt(questions);
			q("DELETE FROM employee WHERE ?",{ id: employee});
		} catch (err) {
			throw err;
		}
	},
	removeDepartment: async function (q) {
		var departmentList = await this.generateDepartments(q);
		try{
			const questions = {
				name: "department",
				type: "list",
				message: "Which department would you like to remove?",
				choices: departmentList
			}
			const { department } = await prompt(questions);
			q("DELETE FROM department WHERE ?",{id: department});
		} catch (err) {
			throw err;
		};
	},
	removeRole: async function (q) {
		var roleList = await this.generateRoles(q);
		try{
			const questions = {
				name: "role",
				type: "list",
				message: "Which role would you like to remove?",
				choices: roleList
			}
			const { role } = await prompt(questions);
			q("DELETE FROM role WHERE ?",{id: role});
		} catch (err) {
			throw err;
		};
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
	updateRole: async function(q) {
		var employeeList = await this.generateEmployees(q);
		var roleList = await this.generateRoles(q);
		try{const questions = [
			{
				name: "employee",
				type: "list",
				message: "Which employee would you like to update?",
				choices: employeeList
			},
			{
				name: "role",
				type: "list",
				message: "What role would you like to assign them?",
				choices: roleList
			},
		];
		const { employee, role } = await prompt(questions);
		const { name: role_title } = await roleList.find(o => o.value === role);
		q("UPDATE employee SET employee.role_id = ?, employee.role_title = ? WHERE employee.id = ? ",[role, role_title, employee]);

		} catch (err) {
			throw err;
		}
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
				{value: 'addDepartment', name: "Add department."},
				{value: 'addRole', name: "Add role."},
				{value: 'removeEmployee', name: "Remove employee."},
				{value: 'removeDepartment', name: "Remove department."},
				{value: 'removeRole', name: "Remove role."},
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
// actions.generateEmployees(queryAsync);

init();