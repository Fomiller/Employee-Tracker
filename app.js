const DB = require("./data/connection");
const figlet = require("figlet")

function writeText () {
    figlet('Employee Tracker!!', {
        horizontalLayout: 'full',
    },function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
};

writeText();
// DB.createEmployee(850, "Johnny", "Bravo", 8, 202);
// DB.createDepartment(8,"Europe");
// DB.createRole(8,"Janitor", 25000.00, 8)
// DB.deleteEmployee("Johnny");

// DB.updateRole(4, "Johnny");

// DB.readDepartment();
// DB.readRole();
// DB.readEmployee();

// console.log(DB);
