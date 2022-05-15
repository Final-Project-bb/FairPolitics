const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, // i.p address of server
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
        console.log('Not Connected! :(');
    }
    else {
        console.log('Connected! :)');
    }
});

module.exports = connection; 