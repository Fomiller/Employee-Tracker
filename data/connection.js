// DEPENDENCIES
var mysql = require("mysql");

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

module.exports = DB;


// THINGS TO REMEMBER
// a question mark is a place holder for a value, the first ? refers to the first value in the object. 