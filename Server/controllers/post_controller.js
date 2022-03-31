const Post = require("../models/post");
const express = require("express");
const mysql = require("mysql");
const connection = require("../lib/db");

const createPost = (req, res) => {
  let sqlInsertPost = `insert into Post(user_id,title,tag,description,picture)
    values(
    ${JSON.stringify(req.body.user_id)}, 
    ${JSON.stringify(req.body.title)},
    ${JSON.stringify(req.body.tag)}, 
    ${JSON.stringify(req.body.description)},
    ${JSON.stringify(req.body.picture)})`;
  let sqlGetPostId = "select LAST_INSERT_ID() as post_id from Post limit 1";

  connection.query(sqlInsertPost, function (err, result) {
    if (err) {
      throw err;
    } else {
      connection.query(sqlGetPostId, function (err, postId) {
        if (err) {
          throw err;
        } else {
          let id = postId[0].post_id;
          res.status(200).send({ message: `post ${id} added successfully!` });
        }
      });
    }
  });
};

const updatePost = (req, res) => {
  let sqlUpdatePost = `update Post set 
                        title=${JSON.stringify(req.body.title)},
                        tag=${JSON.stringify(req.body.tag)}, 
                        description=${JSON.stringify(req.body.description)},
                        picture=${JSON.stringify(req.body.picture)} 
                        where post_id=${req.params.post_id}`;
  connection.query(sqlUpdatePost, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).send({ message: `post updated successfully!` });
  });
};

const deletePost = (req, res) => {
  let deletePostSql = `delete from Post where post_id = ${JSON.stringify(
    req.params.post_id
  )}`;
  let deleteAllCommentsSql = `delete from Post_response where post_id = ${JSON.stringify(
    req.params.post_id
  )}`;
  let deleteAllLikesSql = `delete from Post_like_approval where post_id = ${JSON.stringify(
    req.params.post_id
  )}`;

  connection.query(deleteAllLikesSql, function (err, result) {
    if (err) {
      throw err;
    }
    connection.query(deleteAllCommentsSql, function (err, result) {
      if (err) {
        throw err;
      }
      connection.query(deletePostSql, function (err, result) {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: `post deleted! successfully` });
      });
    });
  });
};

const addComment = (req, res) => {
  let sqlInsertComment = `insert into Post_response (post_id,user_id,comment)
                        values(
                        ${JSON.stringify(req.body.post_id)}, 
                        ${JSON.stringify(req.body.user_id)}, 
                        ${JSON.stringify(req.body.comment)})`;

  let sqlGetPostId = "select LAST_INSERT_ID() as comment_id from Post_response limit 1";

  connection.query(sqlInsertComment, function (err, result) {
    if (err) {
      throw err;
    }
    connection.query(sqlGetPostId, function (err, result) {
      if (err) {
        throw err;
      }
      res.status(200).send({ message: "comment added successfully!", id: result });
    });
  });
};

const updateComment = (req, res) => {
  let sqlUpdateComment = `update Post_response set 
                          comment=${JSON.stringify(req.body.comment)}
                          where 
                          comment_id=${JSON.stringify(req.params.comment_id)}`;

  connection.query(sqlUpdateComment, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).send({ message: `comment updated!` });
  });
};

const deleteComment = (req, res) => {
  let sqlDelComment = `delete from Post_response where comment_id = ${req.params.comment_id}`;

  connection.query(sqlDelComment, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).send({ message: "comment deleted successfully!" });
  });
};

const addLikeToPost = (req, res) => {
  let sqlLikeExists = `select * from Post_like_approval 
                      where post_id=${JSON.stringify(req.body.post_id)} 
                      and user_id=${JSON.stringify(req.body.user_id)}`;

  let sqlInsertLikeDisc = `insert into Post_like_approval(post_id,user_id)
                            values(${JSON.stringify(req.body.post_id)}, 
                            ${JSON.stringify(req.body.user_id)})`;

  let sqlDeleteLikeDisc = `delete from Post_like_approval 
                          where post_id=${JSON.stringify(req.body.post_id)} 
                          and user_id=${JSON.stringify(req.body.user_id)}`;

  connection.query(sqlLikeExists, function (err, likeExist) {
    if (err) {
      throw err;
    }
    if (likeExist.length === 0) {
      connection.query(sqlInsertLikeDisc, function (err, result) {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: "like added successfully!" });
      });
    } else {
      connection.query(sqlDeleteLikeDisc, function (err, result) {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: "like removed successfully!" });
      });
    }
  });
};

const addLikeToComment = (req, res) => {
  let sqlLikeExists = `select * from comment_like_approval 
                      where comment_id=${JSON.stringify(req.body.comment_id)} 
                      and user_id=${JSON.stringify(req.body.user_id)}`;

  let sqlInsertLikeDisc = `insert into comment_like_approval(comment_id,user_id)
                            values(${JSON.stringify(req.body.comment_id)}, 
                            ${JSON.stringify(req.body.user_id)})`;

  let sqlDeleteLikeDisc = `delete from comment_like_approval 
                          where comment_id=${JSON.stringify(
                            req.body.comment_id
                          )} 
                          and user_id=${JSON.stringify(req.body.user_id)}`;

  connection.query(sqlLikeExists, function (err, likeExist) {
    if (err) {
      throw err;
    }
    if (likeExist.length === 0) {
      connection.query(sqlInsertLikeDisc, function (err, result) {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: "Comment liked successfully!" });
      });
    } else {
      connection.query(sqlDeleteLikeDisc, function (err, result) {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: "Comment unliked successfully!" });
      });
    }
  });
};

const getLikeOfPost = (req, res) => {
  let sqlGetLikeByPostId = `select user_id from Post_like_approval
                            where post_id=${req}`;

  connection.query(sqlGetLikeByPostId, function (err, result) {
    if (err) {
      throw err;
    } else {
      return result;
      // res.status(200).send({ result });
    }
  });
};

const deleteLikeFromPost = (req, res) => {
  let sqlDelLikeDisc = `delete from Post_like_approval where post_id = ${req.params.post_id}`;

  connection.query(sqlDelLikeDisc, function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send({ message: "post_id or user_id dosn't exists!" });
    } else {
      res.status(200).send({ message: "like deleted successfully!" });
    }
  });
};

const PostsFollowing = (req, res) => {
  let getPostsWithCommentsSql = `SELECT Post.post_id, Post.user_id, Post.title, Post.description, Post.tag, Post.picture,
  Post_response.comment_id, Post_response.comment, Post_response.user_id as 'user_id_comment'
  FROM Post left JOIN Post_response
  ON Post.post_id = Post_response.post_id
  where Post.user_id in (select user_following_id from follower where user_id=${JSON.stringify(
    req.params.user_id
  )})
  group by Post_response.comment_id order by Post.post_id`;

  let getPostLikesSql = `select * from Post_like_approval order by post_id`;

  let getCommentLikesSql = `select * from comment_like_approval order by comment_id`;

  let allPostsWithComments = [];
  let post_id_hand = -1;
  connection.query(getPostsWithCommentsSql, function (err, posts) {
    if (err) {
      throw err;
    }
    let post;
    posts.forEach((p) => {
      if (p.post_id == post_id_hand) {
        post.comments.push({
          comment_id: p.comment_id,
          comment: p.comment,
          user_id_comment: p.user_id_comment,
        });
      } else {
        post_id_hand = p.post_id;
        post = {
          post_id: p.post_id,
          user_id: p.user_id,
          title: p.title,
          description: p.description,
          tag: p.tag,
          picture: p.picture,
          comments: [
            {
              comment_id: p.comment_id,
              comment: p.comment,
              user_id_comment: p.user_id_comment,
            },
          ],
          likes: [],
        };
        allPostsWithComments.push(post);
      }
    });

    connection.query(getPostLikesSql, function (err, likes) {
      if (err) {
        throw err;
      }

      connection.query(getCommentLikesSql, function (err, comment_likes) {
        if (err) {
          throw err;
        }
        allPostsWithComments.forEach((post) => {
          likes.forEach((like) => {
            if (like.post_id == post.post_id) {
              post.likes.push(like.user_id);
            }
          });
          post.comments.forEach((comment) => {
            comment.comment_likes = [];
            comment_likes.forEach((comment_like) => {
              if (comment.comment_id == comment_like.comment_id) {
                comment.comment_likes.push(comment_like.user_id);
              }
            });
          });
        });
        return res.status(200).send({ allPostsWithComments });
      });
    });
  });
};

const getPost = (req, res) => {
  let getPostsWithCommentsSql = `SELECT Post.post_id, Post.user_id, Post.title, Post.description, Post.tag, Post.picture, 
  Post_response.comment_id, Post_response.comment,  Post_response.user_id as 'user_id_comment'
  FROM Post left JOIN Post_response      
  ON Post.post_id = Post_response.post_id
  where Post.user_id = ${JSON.stringify(req.params.user_id)}
  order by Post.post_id`;

  let getPostLikesSql = `select * from Post_like_approval order by post_id`;

  let getCommentLikesSql = `select * from comment_like_approval order by comment_id`;

  let allPostsWithComments = [];
  let post_id_hand = -1;
  connection.query(getPostsWithCommentsSql, function (err, posts) {
    if (err) {
      throw err;
    }
    let post;
    posts.forEach((p) => {
      if (p.post_id == post_id_hand) {
        post.comments.push({
          comment_id: p.comment_id,
          comment: p.comment,
          user_id_comment: p.user_id_comment,
        });
      } else {
        post_id_hand = p.post_id;
        post = {
          post_id: p.post_id,
          user_id: p.user_id,
          title: p.title,
          description: p.description,
          tag: p.tag,
          picture: p.picture,
          comments: [
            {
              comment_id: p.comment_id,
              comment: p.comment,
              user_id_comment: p.user_id_comment,
            },
          ],
          likes: [],
        };
        allPostsWithComments.push(post);
      }
    });

    connection.query(getPostLikesSql, function (err, likes) {
      if (err) {
        throw err;
      }

      connection.query(getCommentLikesSql, function (err, comment_likes) {
        if (err) {
          throw err;
        }
        allPostsWithComments.forEach((post) => {
          likes.forEach((like) => {
            if (like.post_id == post.post_id) {
              post.likes.push(like.user_id);
            }
          });
          post.comments.forEach((comment) => {
            comment.comment_likes = [];
            comment_likes.forEach((comment_like) => {
              if (comment.comment_id == comment_like.comment_id) {
                comment.comment_likes.push(comment_like.user_id);
              }
            });
          });
        });
        return res.status(200).send({ allPostsWithComments });
      });
    });
  });
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  addLikeToPost,
  addLikeToComment,
  deleteLikeFromPost,
  PostsFollowing,
};

// getLikeOfPost,
//     getLikeOfComment,