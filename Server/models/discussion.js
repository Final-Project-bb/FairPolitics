const Comment = require('../models/comment');
const Picture = require('../models/picture');
const Like = require('../models/like');

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
        this.pictures = [Picture];
        this.comments = [Comment];
        this.likes = [Like];
    }
}

module.exports = Discussion;