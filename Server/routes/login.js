const express = require('express');
const { createUser, getUser, updateUser, deleteUser, auth,
        getFollowing, getFollowers} = require("../controllers/login_controller")

const router = express.Router();

router.post("/create_user", createUser);
router.get("/get_user/:user_id", getUser);
router.put("/update_user/:user_id", updateUser);
router.delete("/delete_user/:user_id", deleteUser);
router.put("/add_user/", auth);
router.get("/get_following/:user_id", getFollowing);
router.get("/get_followers/:user_id", getFollowers);

module.exports = {
    routes: router
};