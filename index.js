//import 3rd party libraries/modules
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();

//import the routes
const todoRoutes = require('./routes/todo');

const app = express();

//import database connection
require('./util/database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//use body parser to parse json data
app.use(bodyParser.json());

//middleware to handle routes
app.use('/api/',todoRoutes);

//middleware to handle errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;   
    res.status(status).json({message: message, data: data});
});

//start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");    
});
