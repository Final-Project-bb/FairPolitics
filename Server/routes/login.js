const express = require("express");
const router = express.Router();
const passport = require("passport");
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


const CLIENT_URL = "http://localhost:3000/";

router.get("/connection/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      // user_id:req.params.user_id
      //   cookies: req.cookies
    });
    console.log("aaaaa")
  }
});

router.get("/connection/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
  console.log("sads")
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}`,
    failureRedirect: "/connection/login/failed",
    
  })
);

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = {
  routes: router,
};
