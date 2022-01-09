const Like = require('./models/like');

class Comment {
    constructor(
        comment_id,
        post_id,
        user_id,
        comment
    ) {
        this.comment_id = comment_id;
        this.post_id = post_id;
        this.user_id = user_id;
        this.comment = comment;
        this.likes = [Like];
    }
}

module.exports = Comment;