const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected to database!');
    // console.log(client);
}).catch(err => {
    console.log(err);
});

module.exports = {mongoose};