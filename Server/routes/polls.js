const express = require('express');
const {createPoll, getPoll, updatePoll, deletePoll, answerPoll,
        pollsFollowing} = require("../controllers/poll_controller")

const router = express.Router();

router.post("/create_poll", createPoll);
router.get("/get_polls/:user_id", getPoll);
router.put("/update_poll/:poll_id/:user_id", updatePoll);
router.delete("/delete_poll/:poll_id/:user_id", deletePoll);
router.post("/answer_poll/:poll_id/:user_id/:answer_id", answerPoll);
router.get("/poll_feed/:user_id", pollsFollowing);

module.exports = {
    routes: router
};

