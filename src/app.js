const express = require('express');
const http = require('http');
const cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser')
const os = require('os');
const app = express();
require('dotenv').config();
// Load environment variables from .env file
const { PORT } = process.env;
// Set the port from environment variable or default to 5000
// If PORT is not defined, it will default to 5000  
let port = PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./")));
app.use(bodyParser.json());


// var httpServer = http.createServer(app);



const {conn, mongoose} = require('./middleware/connection')
mongoose.set('strictQuery', false);


// Define routes

app.use('/api/agent', require("./routes/agentRoutes"));
// app.use('/api/user', require("./routes/userRoutes"));

app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/message', require('./routes/messageRoutes'));
app.use('/api/policy', require('./routes/policyRoutes'));



// CPU Monitoring & Restart
setInterval(() => {
    const usage = os.loadavg()[0] / os.cpus().length * 100;
    if (usage > 70) {
        console.log(`High CPU usage detected (${usage.toFixed(2)}%). Restarting server...`);
        process.exit(1);
    }
}, 5000);



app.listen(port,()=>{
    console.log(`Listening on PORT :- ${port}`);
})

module.exports = app