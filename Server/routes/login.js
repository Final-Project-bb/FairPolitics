const express = require("express");
const router = express.Router();
const connection = require("../lib/db");

const {
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
  removeFollowing,
  getUserById,
  chooseAlgorithm,
  getChosenAlgorithm,
} = require("../controllers/login_controller");

// const router = express.Router();

router.post("/create_user", createUser); //works fine
router.put("/login_user", loginUser); //works fine
router.put("/update_user", updateUser); //works fine
router.delete("/delete_user/:user_id", deleteUser); //works fine
router.get("/search_by_name/:first_name/:user_id", searchByName); //works fine
router.get("/get_user_by_id/:user_id", getUserById);
// router.put("/get_users_by_ids", getUsers); //works fine //NOTE: need to DELETE it from client and server
router.put("/add_user/", auth);

// router.get("/get_following/:user_id", getFollowing); //works fine //NOTE: need to DELETE it from client and server
// router.get("/get_followers/:user_id", getFollowers); //works fine //NOTE: need to DELETE it from client and server
router.get("/get_follow/:user_id", getFollow); //works fine //NOTE: need to USE it for client and server
router.post("/add_following", addFollowing); //works fine
router.delete("/remove_following", removeFollowing); //works fine

router.post("/choose_algorithm/:user_id/:algorithm_id", chooseAlgorithm); //works fine
router.get("/get_algorithm/:user_id", getChosenAlgorithm); //works fine

module.exports = {
  routes: router,
};
