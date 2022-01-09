const comments = require('./models/comment');
const pictures = require('./models/picture');

class Discussion {
    constructor(
        post_id,
        user_id,
        title,
        description
    ) {
        this.post_id = post_id;
        this.user_id = user_id;
        this.title = title;
        this.tag = [];
        this.description = description;
        this.pictures = [pictures];
        this.comments = [comments];
    }
}

module.exports = Discussion;