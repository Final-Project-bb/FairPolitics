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
router.get("/search_by_name/:first_name", searchByName);
router.put("/get_users_by_ids", getUsers);
router.put("/add_user/", auth);

router.get("/get_following/:user_id", getFollowing);
router.get("/get_followers/:user_id", getFollowers);
router.get("/get_follow/:user_id", getFollow);
router.post("/add_following/:user_id", addFollowing);
router.delete("/remove_following/:user_id", removeFollowing);

module.exports = {
    routes: router
};
