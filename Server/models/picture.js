class Picture {
    constructor(
        pic_url,
        user_id,
        post_id,
        poll_id
    ) {
        this.pic_url = pic_url;
        this.user_id = user_id;
        this.post_id = post_id;
        this.poll_id = poll_id;
    }
}

module.exports = Picture;