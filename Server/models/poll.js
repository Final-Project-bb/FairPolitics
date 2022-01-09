const Answer = require('./models/answer');
const Picture = require('./models/picture');

class Poll {
    constructor(
        poll_id,
        user_id,
        title,
        description
    ) {
        this.poll_id = poll_id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.pictures = [Picture];
        this.answers = [Answer];
    }
}

module.exports = Poll;