class Answer {
    constructor(
        answer_id,
        poll_id,
        user_id,
        answer
    ) {
        this.answer_id = answer_id;
        this.poll_id = poll_id;
        this.user_id = user_id;
        this.answer = answer;
    }
}

module.exports = Answer;