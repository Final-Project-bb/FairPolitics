const Poll = require("../models/poll");
const express = require("express");
const mysql = require("mysql");
const connection = require("../lib/db");
const { query } = require("express");

const createPoll = (req, res) => {
  var sqlInsertPoll = `Insert into poll(user_id,title,description,picture)
                values(${JSON.stringify(req.body.user_id)},${JSON.stringify(
    req.body.title
  )},${JSON.stringify(req.body.description)}
                ,${JSON.stringify(req.body.picture)})`;

  var sqlPollId = "select LAST_INSERT_ID() as poll_id from poll limit 1";

  connection.query(sqlInsertPoll, function (err, result) {
    if (err) {
      throw err;
    } else {
      connection.query(sqlPollId, function (err, result) {
        if (err) {
          throw err;
        } else {
          req.body.answer.forEach((ans) => {
            connection.query(
              `Insert into poll_answer(poll_id,user_id,answer)
                        values(${result[0].poll_id}, ${JSON.stringify(
                req.body.user_id
              )}, ${JSON.stringify(ans)})`,
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
  // var user_id = req.params.user_id;

  connection.query(
    `select * from poll where user_id = ${req.params.user_id}`,
    function (err, result) {
      if (err) {
        throw err;
      }
      // if polll not found
      if (result.length === 0) {
        res.status(404).send({ message: "poll id or user id not exists!" });
      } else {
        // if poll found
        connection.query(
          `select * from poll_answer where user_id = ${req.params.user_id} and poll_id=${req.params.poll_id}`,
          function (err1, res1) {
            if (err1) {
              throw err1;
            } else {
              res.status(200).send({ result, res1 });
            }
          }
        );
      }
    }
  );
};

const updatePoll = (req, rest) => {};

const deletePoll = (req, res) => {
  // var user_id = req.params.user_id;

  connection.query(
    `select * from poll where user_id = ${req.params.user_id}`,
    function (err, result) {
      if (err) {
        throw err;
      }
      // if polll not found
      if (result.length === 0) {
        res.status(404).send({ message: "poll id or user id not exists!" });
      } else {
        // if poll found
        connection.query(
          `select * from poll_answer where user_id = ${req.params.user_id}`,
          function (err1, res1) {
            if (err1) {
              throw err1;
            } else {
              res.status(200).send({ result, res1 });
            }
          }
        );
      }
    }
  );
};

const answerPoll = (req, res) => {};

const pollsFollowing = (req, res) => {
  // var user_id = req.params.user_id;

  connection.query(
    `select * from poll as p join follower as f on p.user_id = f.user_id where p.user_id = ${req.params.user_id} `,
    function (err, result) {
      if (err) {
        throw err;
      }
      // if polll not found
      if (result.length === 0) {
        res.status(404).send({ message: "poll id or user id not exists!" });
      } else {
        // if poll found
        connection.query(
          `select * from poll_answer where user_id = ${req.params.user_id}`,
          function (err1, res1) {
            if (err1) {
              throw err1;
            } else {
              res.status(200).send({ result, res1 });
            }
          }
        );
      }
    }
  );
};

module.exports = {
  createPoll,
  getPoll,
  updatePoll,
  deletePoll,
  answerPoll,
  pollsByID,
  pollsFollowing,
};
