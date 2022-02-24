const User = require("../models/user");
const express = require('express');
const mysql = require('mysql');
const connection  = require('../lib/db');


const createUser = (req, res) => {

    var sqlFindUserId = `select * from user_details where user_id = ${JSON.stringify(req.body.user_id)}`;

    var sqlInsert = `Insert into user_details(user_id,first_name,last_name,city,birthdate,job_title,description,profile_picture,gender)
                    values(${JSON.stringify(req.body.user_id)}, ${JSON.stringify(req.body.first_name)},
                    ${JSON.stringify(req.body.last_name)}, ${JSON.stringify(req.body.city)},
                    ${JSON.stringify(req.body.birthdate)}, ${JSON.stringify(req.body.job_title)},
                    ${JSON.stringify(req.body.description)}, ${JSON.stringify(req.body.profile_picture)},
                    ${JSON.stringify(req.body.gender)})`;
    
    connection.query(sqlFindUserId, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not exist
        if (result.length === 0) {
            connection.query(sqlInsert);
            res.status(200).send({ message: "user created successfully" });
        }
        else { // if user exist
			res.status(404).send({ message: "user already exists" });
        }
    });
};

const getUser = (req, res) => {

    var sqlGetUserDetails = `select * from user_details where user_id = ${req.params.user_id}`; 
    
    connection.query(sqlGetUserDetails, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not found
        if (result.length === 0) {
            res.status(404).send({ message: "user_id not exists!" });
        }
        else { // if user found
			res.status(200).send({ result });
        }
    });
};

const updateUser = (req, res) => {

    var sqlFindUserId = `select * from user_details where user_id = ${JSON.stringify(req.body.user_id)}`;
    
    var sqlUpdate = `UPDATE user_details set first_name=${JSON.stringify(req.body.first_name)},
            last_name=${JSON.stringify(req.body.last_name)}, city=${JSON.stringify(req.body.city)},
            birthdate=${JSON.stringify(req.body.birthdate)}, job_title=${JSON.stringify(req.body.job_title)},
            description=${JSON.stringify(req.body.description)}, profile_picture=${JSON.stringify(req.body.profile_picture)},
            gender=${JSON.stringify(req.body.gender)} where user_id=${JSON.stringify(req.body.user_id)}`;
    
    connection.query(sqlFindUserId, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not exist
        if (result.length === 0) {
            res.status(404).send({ message: "user_id not exists!" });
        }
        else { // if user exist
            connection.query(sqlUpdate, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send({ message: "user update successfully" });
                }
            });
        }
    });
};

const deleteUser = (req, res) => {
    
    var sqlDelFromUserDetails = `delete from user_details where user_id = ${req.params.user_id}`; 
    
    connection.query(sqlDelFromUserDetails, function (err, result) {
        if (err) {
			throw err;
		} 
        // if user not found
        if (result.length === 0) {
            res.status(404).send({ message: "user_id not exists!" });
        }
        else { // if user found
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

const addFollowing = (req, res) => {

    var sqlUserId = `select user_following_id from follower where user_id=${JSON.stringify(req.body.user_id)} and
                    user_following_id = ${JSON.stringify(req.body.user_following_id)}`;
    
    var sqlInsert = `Insert into follower(user_id,user_following_id)
                values(${JSON.stringify(req.body.user_id)},${JSON.stringify(req.body.user_following_id)})`;
    
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

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    auth,
    getFollowing,
    getFollowers,
    addFollowing,
    removeFollowing
};
