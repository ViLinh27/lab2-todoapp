const mongoose = require("mongoose"); //initialize connection to DB here

// NEVER DO THIS
// store the secrets (username, password, etc) in an environment variable instead
const uri = "";//connection-uri-here

function connect() { //connects do db
    const options = { useNewUrlParser:true };
    mongoose.connect(uri, options).then(
        () => { console.log("Database connection established!"); },
        err => { console.log("Error connecting Database instance due to: ", err); }
    )
}

module.exports = connect;