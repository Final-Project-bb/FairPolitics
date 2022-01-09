const express = require('express');
const {createPoll, getPoll, updatePoll, deletePoll, answerPoll} =
                    require("../controllers/poll_controller")

const router = express.Router();

router.post("/create_poll", createPoll);
router.get("/get_poll/:poll_id/:user_id", getPoll);
router.put("/update_poll/:poll_id/:user_id", updatePoll);
router.delete("/delete_poll/:poll_id/:user_id", deletePoll);
router.post("/answer_poll/:poll_id/:user_id/:answer_id", answerPoll);

module.exports = {
    routes: router
};

