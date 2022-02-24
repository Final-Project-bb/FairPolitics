const express = require('express');
const router = express.Router();
const connection = require('../lib/db');

const { createUser, getUser, updateUser, deleteUser, auth,
        getFollowing, getFollowers, addFollowing, removeFollowing} = require("../controllers/login_controller")


// const router = express.Router();

router.post("/create_user", createUser);
router.get("/get_user/:user_id", getUser);
router.put("/update_user/:user_id", updateUser);
router.delete("/delete_user/:user_id", deleteUser);
router.put("/add_user/", auth);

router.get("/get_following/:user_id", getFollowing);
router.get("/get_followers/:user_id", getFollowers);
router.post("/add_following/:user_id", addFollowing);
router.delete("/remove_following/:user_id", removeFollowing);

module.exports = {
    routes: router
};
