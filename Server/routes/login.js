const express = require('express');
const router = express.Router();
const connection = require('../lib/db');

const { createUser, loginUser, updateUser, deleteUser, searchByName, getUsers, auth,
        getFollowing, getFollowers, getFollow, addFollowing, removeFollowing} = require("../controllers/login_controller")


// const router = express.Router();

router.post("/create_user", createUser); //works fine
router.put("/login_user", loginUser); //works fine
router.put("/update_user", updateUser); //works fine
router.delete("/delete_user/:user_id", deleteUser); //works fine
router.get("/search_by_name/:first_name/:user_id", searchByName); //works fine
router.put("/get_users_by_ids", getUsers); //works fine
router.put("/add_user/", auth); 

router.get("/get_following/:user_id", getFollowing); //works fine
router.get("/get_followers/:user_id", getFollowers); //works fine
router.get("/get_follow/:user_id", getFollow); //works fine
router.post("/add_following", addFollowing); //works fine
router.delete("/remove_following", removeFollowing); //works fine

module.exports = {
    routes: router
};
