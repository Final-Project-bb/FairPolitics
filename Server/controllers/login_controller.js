const User = require("../models/user");
const express = require('express');
const mysql = require('mysql');
const connection  = require('../lib/db');


const createUser = (req, res) => {
    var sqlFindUserId = `select * from user_details where user_id = ${JSON.stringify(req.body.user_id)}`;

    var sqlInsertUser = `Insert into user_details(user_id,first_name,last_name,city,birthdate,job_title,description,profile_picture,gender, semi_description, is_public_elected)
                    values(${JSON.stringify(req.body.user_id)}, ${JSON.stringify(req.body.first_name)},
                    ${JSON.stringify(req.body.last_name)}, ${JSON.stringify(req.body.city)},
                    ${JSON.stringify(req.body.birthdate)}, ${JSON.stringify(req.body.job_title)},
                    ${JSON.stringify(req.body.description)}, ${JSON.stringify(req.body.profile_picture)},
                    ${JSON.stringify(req.body.gender)}, ${JSON.stringify(req.body.semi_description)}, ${JSON.stringify(req.body.is_public_elected)})`;
                    
    var sqlInsertLogin = `Insert into login_details(user_id, phone_number, password)
                    values(${JSON.stringify(req.body.user_id)}, ${JSON.stringify(req.body.phone_number)},
                    ${JSON.stringify(req.body.password)})`;
    
    connection.query(sqlFindUserId, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not exist
        if (result.length === 0) {
            connection.query(sqlInsertUser, function (err, result) {
                if (err) {
                    throw err;
                } 
            connection.query(sqlInsertLogin);
            res.status(200).send({ message: "user created successfully" });
            
        })
    }else { // if user exist
			res.status(400).send({ message: "user already exists" });
        }
    });
};

const loginUser = (req, res) => {
    var sqlGetLoginDetails = `select * from login_details where user_id = ${req.body.user_id}`; 
    var sqlGetUserDetails = `select * from user_details where user_id = ${req.body.user_id}`; 
    connection.query(sqlGetLoginDetails, function (err, result1) {
        if (err) {
			throw err;
		} 
        // if user not found
        if (result1.length === 0) {
            res.status(404).send({ message: "user_id not exists!" });
        }
        else { // if user found
            if (req.body.password === result1[0].password) {
                connection.query(sqlGetUserDetails, function (err, result) {
                    // console.log(result);
                    res.status(200).send({ result, message: "successfully logged-in" });
                });
            } else {
            res.status(404).send({ message: "Wrong password" });

            }
        }
    });
};

const updateUser = (req, res) => { 
    
    var sqlUpdate = `UPDATE user_details set first_name=${JSON.stringify(req.body.first_name)},
            last_name=${JSON.stringify(req.body.last_name)}, city=${JSON.stringify(req.body.city)},
            birthdate=${JSON.stringify(req.body.birthdate)},job_title=${JSON.stringify(req.body.job_title)},
            description=${JSON.stringify(req.body.description)}, profile_picture=${JSON.stringify(req.body.profile_picture)},
            gender=${JSON.stringify(req.body.gender)}, is_public_elected=${JSON.stringify(req.body.is_public_elected)} where user_id=${JSON.stringify(req.body.user_id)}`;

            connection.query(sqlUpdate, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send({ result, message: "user update successfully" });
                }
            });
};

const deleteUser = (req, res) => {
    
    var sqlDelFromUserDetails = `delete from user_details where user_id = ${req.params.user_id}`;
    var sqlDelFromUserLogin = `delete from login_details where user_id = ${req.params.user_id}`;
    
    connection.query(sqlDelFromUserDetails, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not found
        if (result.length === 0) {
            res.status(404).send({ message: "user_id not exists!" });
        }
        else { // if user found
            connection.query(sqlDelFromUserLogin);
			res.status(200).send({ message:"user delete successfully!" });
        }
    });
};

//Note: didn't check this function yet!
const auth = (req, res) => {

    var sqlFindUserId = `select * from login_details where user_id = ${JSON.stringify(req.body.user_id)}`;

    var sqlInsert = `Insert into login_details(user_id,phone_number,password)
    values(${JSON.stringify(req.body.user_id)},${JSON.stringify(req.body.phone_number)},${JSON.stringify(req.body.password)})`;
    
    connection.query(sqlFindUserId, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not exist
        if (result.length === 0) {
            //Note: auth with sms temp code !!
            connection.query(sqlInsert);
            res.status(200).send({ message: "user auth successfully" });
        }
        else { //Note: if user exist, need to check where it should be taking care of.
			res.status(404).send({ message: "user already exists" });
        }
    })
};

const getFollowing = (req, res) => {

    var sqlGetUserFollowingId = `select user_following_id from follower where user_id= ${req.params.user_id}`;
    
    connection.query(sqlGetUserFollowingId, function (err, result) {
        if (err) {
			throw err;
		}
        else {
			res.status(200).send({ result });
        }
    });
};

const getFollowers = (req, res) => {

    var sqlGetUserFollowersId = `select user_id from follower where user_following_id= ${req.params.user_id}`;
    
    connection.query(sqlGetUserFollowersId, function (err, result) {
        if (err) {
			throw err;
		}
        else {
			res.status(200).send({ result });
        }
    });
};

const getFollow = (req, res) => {
    var sqlGetUserFollowingId = `select distinct ud.user_id ,ud.first_name,ud.last_name,ud.city,ud.job_title,
    ud.description,ud.profile_picture,ud.gender,ud.semi_description,ud.is_public_elected,ud.age,ud.birthdate 
    from user_details as ud left join follower as f on f.user_id=ud.user_id
    where ud.user_id in (select user_following_id as user_id from follower where user_id= ${req.params.user_id})`;
    var sqlGetUserFollowersId = `select ud.user_id ,first_name,last_name,city,job_title,
    description,profile_picture,gender,semi_description,is_public_elected,age,birthdate 
    from follower as f join user_details as ud on f.user_id=ud.user_id
     where user_following_id= ${req.params.user_id}`;

    connection.query(sqlGetUserFollowingId, function (err, following) {
        if (err) {
			throw err;
		}
        else {
            connection.query(sqlGetUserFollowersId, function (err, follower) {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send({ following, follower });
                }
            });
        }
    });

    

};


const addFollowing = (req, res) => {

    
    var sqlUserId = `select user_following_id from follower where user_id=${JSON.stringify(req.body.user_id)} and
                    user_following_id = ${JSON.stringify(req.body.user_following_id)}`;
    
    var sqlInsert = `Insert into follower(user_id,user_following_id)
                values(${JSON.stringify(req.body.user_id)},${JSON.stringify(req.body.user_following_id)})`;
    if(req.body.user_following_id===req.body.user_id)
    {
			res.status(404).send({ message: "user can't follow himself!" });
            return;
    }
    connection.query(sqlUserId, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not exist
        if (result.length === 0) {
            connection.query(sqlInsert, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send({ message: "user following successfully" });
                }
            });
        }
        else { // if user exist
			res.status(404).send({ message: "user already following" });
        }
    });
};

const removeFollowing = (req, res) => {

    var sqlUserId = `select user_following_id from follower where user_id=${JSON.stringify(req.body.user_id)} and
                    user_following_id = ${JSON.stringify(req.body.user_following_id)}`;
    
    var sqlDel = `delete from follower where user_id=${JSON.stringify(req.body.user_id)} and
                user_following_id = ${JSON.stringify(req.body.user_following_id)}`;
    
    connection.query(sqlUserId, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not exist
        if (result.length === 0) {
            res.status(404).send({ message: `user ${JSON.stringify(req.body.user_following_id)} not following` });
        }
        else { // if user exist
            connection.query(sqlDel, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send({ message: "user following deleted" });
                }
            });
        }
    });
};


const searchByName = (req, res) => {
    var sqlGetUserDetails = `select * from user_details where (first_name = ${JSON.stringify(req.params.first_name)} or
     last_name = ${JSON.stringify(req.params.first_name)}) 
    and user_id != ${JSON.stringify(req.params.user_id)}`; 
    connection.query(sqlGetUserDetails, function (err, result) {
        if (err) {
            throw err;
        }
        res.status(200).send({ result });
    });
}

const getUsers = (req, res) => {
    var sqlGetUserDetails = `select * from user_details where user_id = ${JSON.stringify(req.body[0])}`;
    for (let i = 1; i < req.body.length; i++) {
        sqlGetUserDetails += ` or user_id = ${JSON.stringify(req.body[i])}`;
    }
    connection.query(sqlGetUserDetails, function (err, result) {
        if (err) {
            throw err;
        }
        res.status(200).send({ result });
    });


}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    searchByName,
    getUsers,
    auth,
    getFollowing,
    getFollowers,
    getFollow,
    addFollowing,
    removeFollowing
};