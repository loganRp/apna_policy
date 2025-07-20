const mongoose = require('mongoose');
require('dotenv').config();

// Create a connection to the MongoDB database
// The connection string is stored in an environment variable for security
var conn = mongoose.createConnection(process.env.MongoDB_URL,{useNewUrlParser: true})
if(conn) 
    console.log("Db connected.");
else
    console.log("Failed");

exports.conn = conn
exports.mongoose = mongoose