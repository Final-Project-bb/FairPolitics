const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'sheva7',
    database: 'fairpoliticsdb'
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
        console.log('Not Connected!:)');
    }
    else {
        console.log('Connected!:)');
    }
});

module.exports = connection; 