const figlet = require("figlet")
const text = {
    
    writeText: async function() {
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
    }
}


module.exports = text;