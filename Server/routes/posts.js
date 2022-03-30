const express = require("express");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  addComment,
  getComment,
  updateComment,
  deleteComment,
  addLikeToPost,
  addLikeToComment,
  getLikeOfPost,
  getLikeOfComment,
  deleteLikeFromPost,
  deleteLikeFromComment,
  PostsFollowing,
} = require("../controllers/Post_controller");

const router = express.Router();

router.post("/create_Post", createPost); //works fine
router.get("/get_Posts/:user_id", getPost); //works fine
router.get("/Post_feed/:user_id", PostsFollowing); //works fine
router.put("/update_Post/:post_id", updatePost); //works fine
router.delete("/delete_Post/:post_id", deletePost); //works fine

router.post("/add_comment", addComment); //works fine
// router.get("/get_comment/:comment_id", getComment);
router.put("/update_comment/:comment_id", updateComment); //works fine
router.delete("/delete_comment/:comment_id", deleteComment); //works fine

router.post("/add_like_to_Post", addLikeToPost); //works fine
router.post("/add_like_to_comment", addLikeToComment); //unnecessary?
// router.delete("/delete_like_from_Post/:post_id/:user_id", deleteLikeFromPost); //unnecessary?
// router.delete("/delete_like_from_comment/:comment_id", deleteLikeFromComment); //unnecessary?

module.exports = {
  routes: router,
};
