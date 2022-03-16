const express = require('express');
const {createPoll, getPoll, updatePoll, deletePoll, answerPoll,
        pollsFollowing} = require("../controllers/poll_controller")

const router = express.Router();

router.post("/create_poll", createPoll); //works fine
router.get("/get_polls/:user_id", getPoll); //works fine
router.put("/update_poll/:poll_id", updatePoll); //works fine
router.delete("/delete_poll/:poll_id", deletePoll); //works fine
router.post("/answer_poll", answerPoll); 
router.get("/poll_feed/:user_id", pollsFollowing); //works fine

module.exports = {
    routes: router
};

