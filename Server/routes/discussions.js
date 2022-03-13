const express = require('express');
const { createDiscussion, getDiscussion, updateDiscussion, deleteDiscussion,
        addComment, getComment, updateComment, deleteComment, 
        addLikeToDiscussion, addLikeToComment, getLikeOfDiscussion,
        getLikeOfComment, deleteLikeFromDiscussion, deleteLikeFromComment, 
        discussionsFollowing } = require("../controllers/discussion_controller")

const router = express.Router();

router.post("/create_discussion", createDiscussion); //works fine
router.get("/get_discussions/:user_id", getDiscussion); //works fine
router.get("/discussion_feed/:user_id", discussionsFollowing); //works fine
router.put("/update_discussion/:post_id", updateDiscussion);
router.delete("/delete_discussion/:post_id", deleteDiscussion); //works fine

router.post("/add_comment/:post_id", addComment);
router.get("/get_comment/:comment_id", getComment);
router.put("/update_comment/:comment_id", updateComment);
router.delete("/delete_comment/:comment_id", deleteComment);

router.post("/add_like_to_discussion/:post_id/:user_id", addLikeToDiscussion);
router.post("/add_like_to_comment/:comment_id/:user_id", addLikeToComment);
// router.get("/get_like_of_discussion/:post_id", getLikeOfDiscussion);
// router.get("/get_like_of_comment/:comment_id", getLikeOfComment);
router.delete("/delete_like_from_discussion/:post_id", deleteLikeFromDiscussion);
router.delete("/delete_like_from_comment/:comment_id", deleteLikeFromComment);


module.exports = {
    routes: router
};