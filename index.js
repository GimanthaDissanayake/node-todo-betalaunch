//import 3rd party libraries/modules
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

//use body parser to parse json data
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");    
});
