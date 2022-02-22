const User = require("../models/user");
const express = require('express');
const mysql = require('mysql');
const connection  = require('./lib/db');
const session = require('express-session');
const path = require('path');


const createUser = async (req, res, next) => {

}

const getUser = async (req, res, next) => {
	var user_id = req.body.user_id;
    connection.query('select * from user_details where user_id = ?', [user_id], function (err, rows) {
        if (err) {
			throw err;
		} 
        // if user not found
        if (rows.length <= 0) {
            res.status(404).send({ message: "user_id dosen't found!" });
        }
        else { // if user found
            req.session.loggedin = true;
			res.status(200).send({ rows });
        }
    })
}

const updateUser = async (req, res, next) => {
    
}

const deleteUser = async (req, res, next) => {
    
}

const auth = async (req, res, next) => {
    
}

const getFollowing = async (req, res, next) => {
    
}

const getFollowers = async (req, res, next) => {
    
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    auth,
    getFollowing,
    getFollowers
};



// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const expressValidator = require('express-validator');
// const flash = require('express-flash');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const connection  = require('./lib/db');
// const authRouter = require('./routes/login');
 
// const app = express();
 
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
 
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
 
// app.use(session({ 
//     secret: '123456cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))
 
// app.use(flash());
// app.use(expressValidator());
 
// app.use('/auth', authRouter);
 
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
 
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
 
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// // port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
// app.listen(3000, function () {
//     console.log('Node app is running on port 3000');
// });

// module.exports = app;