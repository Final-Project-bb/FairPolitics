const Comment = require('./comment');
const Picture = require('./picture');
const Like = require('./like');

class Post {
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
        this.pictures = [Picture];
        this.comments = [Comment];
        this.likes = [Like];
    }
}

module.exports = Post;