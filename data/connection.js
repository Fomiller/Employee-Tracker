var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "527996",
    database: "company_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
})

module.exports = DB;