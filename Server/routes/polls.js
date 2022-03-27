const express = require('express');
const {createPoll, getPoll, updatePoll, deletePoll, answerPoll, updateAnswerPoll,
        pollsFollowing} = require("../controllers/poll_controller")

const router = express.Router();

router.post("/create_poll", createPoll); //works fine
router.get("/get_polls/:user_id", getPoll); //works fine
router.put("/update_poll/:poll_id", updatePoll); //works fine
router.delete("/delete_poll/:poll_id", deletePoll); //works fine
router.post("/answer_poll/:user_id", answerPoll); //works fine
router.post("/update_answer_poll/:user_id", updateAnswerPoll); 
router.get("/poll_feed/:user_id", pollsFollowing); //works fine

module.exports = {
    routes: router
};

