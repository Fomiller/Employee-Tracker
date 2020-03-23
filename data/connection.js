// DEPENDENCIES
var mysql = require("mysql");
var cTable = require("console.table");

// console.table([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);


// Create connection to the mysql server
var connection = mysql.createConnection({
    host: "localhost",
    
    // Your port; if not 3306
    port: 3306,
    
    // Your username
    user: "root",
    
    // Your password
    password: "527996",
    database: "company_db"
});

// Connect to the server
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    // call create to begin the process??!!
    // createAuction();
})


const DB = {
// ===============================================================
// Create methods
    createDepartment: function (id, name) {
        console.log("Inserting a new department...\n");
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                id: id,
                name: name,
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department inserted!\n");
                connection.end();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    },

    createRole: function (id, title, salary, department_id) {
        console.log("Inserting a new role...\n");
        var query = connection.query(
            "INSERT INTO role SET ?",
            {
                id: id,
                title: title,
                salary: salary,
                department_id: department_id,
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role inserted!\n");
                connection.end();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    },

    createEmployee: function (id, firstName, lastName, role, manager) {
        console.log("Inserting a new employee...\n");
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
                id: id,
                first_name: firstName,
                last_name: lastName,
                role_id: role,
                manager_id:manager, 
              },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                connection.end();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    },

// ===============================================================
// Update methods
    updateRole: function (role, firstName) {
        console.log("Updating role... \n");
        var query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{
                role_id: role,
            },
            {
                first_name: firstName,
            }],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role updated!\n");
                connection.end();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    },

// ===============================================================
// Delete methods
    deleteEmployee: function (first_name) {
        console.log("Deleting employee...\n");
        connection.query(
            "DELETE FROM employee WHERE ?",
            {
                first_name: first_name,
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee[s] deleted\n");
                connection.end();
            }
        );
    },

// ===============================================================
// Read/View methods
// all read methods returning tables correctly
    readDepartment: function() {
        console.log("Selecting all departments....\n");
        connection.query("SELECT * FROM department", function(err,res) {
            if(err) throw err;
            // log all results of the SELECT statement
            console.table("All tables",res);
            connection.end();
        });
    },

    readRole: function() {
        console.log("Selecting all roles....\n");
        connection.query("SELECT * FROM role", function(err,res) {
            if(err) throw err;
            // log all results of the SELECT statement
            console.table("All Roles",res);
            connection.end();
        });
    },

    readEmployee: function() {
        console.log("Selecting all employees....\n");
        connection.query("SELECT * FROM employee", function(err,res) {
            if(err) throw err;
            // log all results of the SELECT statement
            console.table("All Employees", res);
            connection.end();
        });
    }
}

module.exports = DB;


// THINGS TO REMEMBER
// a question mark is a place holder for a value, the first ? refers to the first value in the object. 