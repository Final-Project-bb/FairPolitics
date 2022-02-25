const Discussion = require("../models/discussion");
const express = require("express");
const mysql = require("mysql");
const connection = require("../lib/db");


const createDiscussion = (req, res) => {

    var sqlInsertDiscussion = `insert into discussion(user_id,title,tag,description,picture)
                        values(${JSON.stringify(req.body.user_id)}, ${JSON.stringify(req.body.title)},
                        ${JSON.stringify(req.body.tag)}, ${JSON.stringify(req.body.description)},
                        ${JSON.stringify(req.body.picture)})`;

    connection.query(sqlInsertDiscussion, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ message: "post added successfully!" });
        }
    });
}

const getDiscussion = (req, res) => {
    
}

const updateDiscussion = (req, res) => {
    
    var sqlUpdatePost = `update discussion set title=${JSON.stringify(req.body.title)},
                        tag=${JSON.stringify(req.body.title)}, description=${JSON.stringify(req.body.description)},
                        picture=${JSON.stringify(req.body.picture)} where post_id=${req.params.post_id}`;

    connection.query(sqlUpdatePost, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ message: `post updated!` });
        }
    });
}

const deleteDiscussion = (req, res) => {

    deleteLikeFromDiscussion(req.params.post_id);

    var sqlFindAllComments = `select * from discussion_response as dr join discussion as ds
                            on dr.post_id = ds.post_id where ds.post_id=${req.params.post_id}`;
    
    connection.query(sqlFindAllComments, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            result.forEach((r) => {
                deleteComment(r.comment_id);
            });
            res.status(200).send({ message: "post deleted successfully" });
        }
    });
}

const addComment = (req, res) => {

    var sqlInsertComment = `insert into discussion_response(post_id,user_id,comment)
                        values(${req.params.post_id}, ${JSON.stringify(req.body.user_id)}, 
                        ${JSON.stringify(req.body.comment)})`;

    connection.query(sqlInsertComment, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ message: "comment added successfully!" });
        }
    });
}

const getComment = (req, res) => {
    
}

const updateComment = (req, res) => {
    
    var sqlUpdateComment = `update discussion_response set commnet=${JSON.stringify(req.body.comment)}
                            where comment_id=${req.params.comment_id}`;

    connection.query(sqlUpdateComment, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ message: `comment updated!` });
        }
    });
}

const deleteComment = (req, res) => {
    
    deleteLikeFromComment(req.params.comment_id);

    var sqlDelComment = `delete from discussion_response where comment_id = ${req.params.comment_id}`;

    connection.query(sqlDelComment, function (err, result) {
        if (err) {
			throw err;
		} 
        if (result.length === 0) {
            res.status(404).send({ message: "comment_id or user_id dosn't exists!" });
        }
        else {
			res.status(200).send({ message:"comment deleted successfully!" });
        }
    });
}

const addLikeToDiscussion = (req, res) => {
    
    var sqlInsertLikeDisc = `insert into discussion_like_approval(post_id,user_id)
                            values(${req.params.post_id}, ${JSON.stringify(req.params.user_id)})`;

    connection.query(sqlInsertLikeDisc, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ message: "like added successfully!" });
        }
    });
}

const addLikeToComment = (req, res) => {
    
    var sqlInsertLikeComment = `insert into comment_like_approval(comment_id,user_id)
                            values(${req.params.comment_id}, ${JSON.stringify(req.params.user_id)})`;

    connection.query(sqlInsertLikeComment, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ message: "like added successfully!" });
        }
    });
}

const getLikeOfDiscussion = (req, res) => {
    
    var sqlGetLikeByPostId = `select user_id from discussion_like_approval
                            where post_id=${req.params.post_id}`;

    connection.query(sqlGetLikeByPostId, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ result });
        }
    });
}

const getLikeOfComment = (req, res) => {
    
    var sqlGetLikeByCommentId = `select user_id from comment_like_approval
                            where comment_id=${req.params.comment_id}`;

    connection.query(sqlGetLikeByCommentId, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.status(200).send({ result });
        }
    });
}

const deleteLikeFromDiscussion = (req, res) => {
    
    var sqlDelLikeDisc = `delete from discussion_like_approval where post_id = ${req.params.post_id}`;

    connection.query(sqlDelLikeDisc, function (err, result) {
        if (err) {
			throw err;
		} 
        if (result.length === 0) {
            res.status(404).send({ message: "post_id or user_id dosn't exists!" });
        }
        else {
			res.status(200).send({ message:"like deleted successfully!" });
        }
    });
}

const deleteLikeFromComment = (req, res) => {
    
    var sqlDelLikeComment = `delete from comment_like_approval where comment_id = ${req.params.comment_id}`;

    connection.query(sqlDelLikeComment, function (err, result) {
        if (err) {
			throw err;
		} 
        if (result.length === 0) {
            res.status(404).send({ message: "post_id or user_id dosn't exists!" });
        }
        else {
			res.status(200).send({ message:"like deleted successfully!" });
        }
    });
}

const discussionsFollowing = (req, res) => {
    
}

module.exports = {
    createDiscussion,
    getDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addComment,
    getComment,
    updateComment,
    deleteComment,
    addLikeToDiscussion,
    addLikeToComment,
    getLikeOfDiscussion,
    getLikeOfComment,
    deleteLikeFromDiscussion,
    deleteLikeFromComment,
    discussionsFollowing
};