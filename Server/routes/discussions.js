const express = require('express');
const { createDiscussion, getDiscussion, updateDiscussion, deleteDiscussion,
        addComment, addLikeToDiscussion, addLikeToComment, getComment,
        getLikeOfDiscussion, getLikeOfComment } =
        require("../controllers/discussion_controller")

const router = express.Router();

router.post("/create_discussion", createDiscussion);
router.get("/get_discussion/:discussion_id/:user_id", getDiscussion);
router.put("/update_discussion/:discussion_id/:user_id", updateDiscussion);
router.delete("/delete_discussion/:discussion_id/:user_id", deleteDiscussion);
router.post("/add_comment/:discussion_id/:user_id/:comment_id", addComment);
router.post("/add_like_to_discussion/:discussion_id/:user_id", addLikeToDiscussion);
router.post("/add_like_to_comment/:comment_id/:user_id", addLikeToComment);
router.get("/get_comment/:discussion_id/:user_id/:comment_id", getComment);
router.get("/get_like_of_discussion/:discussion_id/:user_id", getLikeOfDiscussion);
router.get("/get_like_of_comment/:comment_id/:user_id", getLikeOfComment);

module.exports = {
    routes: router
};