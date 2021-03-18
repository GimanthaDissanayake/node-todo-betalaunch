//import 3rd party libraries/modules
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

require('./util/database');

//use body parser to parse json data
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");    
});
