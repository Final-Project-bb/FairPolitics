const express = require("express");
const {
  createDiscussion,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addComment,
  getComment,
  updateComment,
  deleteComment,
  addLikeToDiscussion,
  addLikeToComment,
  getLikeOfDiscussion,
  getLikeOfComment,
  deleteLikeFromDiscussion,
  deleteLikeFromComment,
  discussionsFollowing,
} = require("../controllers/discussion_controller");

const router = express.Router();

router.post("/create_discussion", createDiscussion); //works fine
router.get("/get_discussions/:user_id", getDiscussion); //works fine
router.get("/discussion_feed/:user_id", discussionsFollowing); //works fine
router.put("/update_discussion/:post_id", updateDiscussion); //works fine
router.delete("/delete_discussion/:post_id", deleteDiscussion); //works fine

router.post("/add_comment", addComment); //works fine
// router.get("/get_comment/:comment_id", getComment);
router.put("/update_comment/:comment_id", updateComment); //works fine
router.delete("/delete_comment/:comment_id", deleteComment); //works fine

router.post("/add_like_to_discussion", addLikeToDiscussion); //works fine
router.post("/add_like_to_comment", addLikeToComment); //unnecessary?
// router.delete("/delete_like_from_discussion/:post_id/:user_id", deleteLikeFromDiscussion); //unnecessary?
// router.delete("/delete_like_from_comment/:comment_id", deleteLikeFromComment); //unnecessary?

module.exports = {
  routes: router,
};
