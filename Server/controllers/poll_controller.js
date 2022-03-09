const Poll = require("../models/poll");
const express = require("express");
const mysql = require("mysql");
const connection = require("../lib/db");
// const { getFollowing } = require("./login_controller")

const createPoll = (req, res) => {
  var sqlInsertPoll = `insert into poll(user_id,title,description,picture)
                        values(${JSON.stringify(
                          req.body.user_id
                        )},${JSON.stringify(req.body.title)},
                        ${JSON.stringify(
                          req.body.description
                        )},${JSON.stringify(req.body.picture)})`;

  var sqlGetPollId = "select LAST_INSERT_ID() as poll_id from poll limit 1";

  connection.query(sqlInsertPoll, function (err, result) {
    if (err) {
      throw err;
    } else {
      connection.query(sqlGetPollId, function (err, result) {
        if (err) {
          throw err;
        } else {
          req.body.answer.forEach((ans) => {
            connection.query(
              `insert into poll_answer(poll_id,user_id,answer)
                                        values(${
                                          result[0].poll_id
                                        }, ${JSON.stringify(req.body.user_id)},
                                        ${JSON.stringify(ans)})`,
              function (err, result) {
                if (err) {
                  throw err;
                }
              }
            );
          });
          res.status(200).send({ message: `poll ${result[0].poll_id} added!` });
        }
      });
    }
  });
};

const getPoll = (req, res) => {
  var sqlGetPollByUserId = `select * from poll where user_id=${req.params.user_id}`;
  var sqlGetAnsOfPoll = `select * from poll_answer where user_id=${req.params.user_id}`;

  connection.query(sqlGetPollByUserId, function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send({ message: "poll_id or user_id dosn't exists!" });
    } else {
      connection.query(sqlGetAnsOfPoll, function (err, res1) {
        if (err) {
          throw err;
        } else {
          res.status(200).send({ result, res1 });
        }
      });
    }
  });
};

const updatePoll = (req, res) => {
  var sqlUpdatePoll = `update poll set title=${JSON.stringify(req.body.title)},
                        description=${JSON.stringify(req.body.description)},
                        picture=${JSON.stringify(req.body.picture)}
                        where user_id=${req.params.user_id} and poll_id=${
    req.params.poll_id
  }`;

  connection.query(sqlUpdatePoll, function (err, result) {
    if (err) {
      throw err;
    } else {
      req.body.answer.forEach((ans) => {
        connection.query(
          `update poll_answer set answer=${JSON.stringify(ans)}
                                where user_id=${req.params.user_id} and
                                poll_id=${req.params.poll_id}`,
          function (err, result) {
            if (err) {
              throw err;
            } else {
              res.status(200).send({ message: `answer updated!` });
            }
          }
        );
      });
      res.status(200).send({ message: `poll updated!` });
    }
  });
};

const deletePoll = (req, res) => {
  var sqlDelPoll = `delete from poll where user_id = ${req.params.user_id} and
                            poll_id = ${req.params.poll_id}`;

  var sqlDelAnsOfPoll = `delete from poll_answer where user_id = ${req.params.user_id} and
                            poll_id=${req.params.poll_id}`;

  connection.query(sqlDelAnsOfPoll, function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send({ message: "poll_id or user_id dosn't exists!" });
    } else {
      res.status(200).send({ message: "poll answer deleted successfully!" });
    }
  });

  connection.query(sqlDelPoll, function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send({ message: "poll_id or user_id dosn't exists!" });
    } else {
      res.status(200).send({ message: "poll deleted successfully!" });
    }
  });
};

// support multipul chooses
const answerPoll = (req, res) => {
  var sqlInsertAnsApproval = `insert into poll_answer_approval(answer_id, user_id)
                                values(${req.params.answer_id}, ${req.params.user_id})`;

  connection.query(sqlInsertAnsApproval, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ message: "answer approval added successfully!" });
    }
  });
};

const pollsFollowing = (req, res) => {
  var sqlGetUserFollowingId = `select user_following_id from follower where user_id = ${req.params.user_id}`;

  var allPolls = [];
  connection.query(sqlGetUserFollowingId, function (err, following) {
    if (err) {
      throw err;
    }
    var size = following.length;
    following.forEach((r) => {
      var sqlGetPollByUserId = `select * from poll where user_id = ${JSON.stringify(
        r.user_following_id
      )}`;
      connection.query(sqlGetPollByUserId, function (err, polls) {
        if (err) {
          throw err;
        }
        if (polls.length > 0) {
          allPolls.push(polls);

          console.log(polls.poll_id);
          polls.forEach((poll) => {
          console.log(poll);
            var sqlGetAnsOfPoll = `select * from poll_answer where poll_id=${JSON.stringify(
              poll.poll_id
            )}`;
            connection.query(sqlGetAnsOfPoll, function (err, answers) {
              if (err) {
                throw err;
              }
              poll.push(answers);
            });
          });
        }
        if (allPolls.length === size) {
          res.status(200).send({ allPolls });
        }
      });
    });
  });
};

module.exports = {
  createPoll,
  getPoll,
  updatePoll,
  deletePoll,
  answerPoll,
  pollsFollowing,
};
