const Poll = require("../models/poll");
const express = require("express");
const mysql = require("mysql");
const connection = require("../lib/db");
// const { getFollowing } = require("./login_controller")

const createPoll = (req, res) => {
  let sqlInsertPoll = `insert into poll(user_id,title,description,picture)
                        values(${JSON.stringify(
                          req.body.user_id
                        )},${JSON.stringify(req.body.title)},
                        ${JSON.stringify(
                          req.body.description
                        )},${JSON.stringify(req.body.picture)})`;

  let sqlGetPollId = "select LAST_INSERT_ID() as poll_id from poll limit 1";

  connection.query(sqlInsertPoll, function (err, result) {
    if (err) {
      throw err;
    } else {
      connection.query(sqlGetPollId, function (err, pollId) {
        if (err) {
          throw err;
        } else {
          let id = pollId[0].poll_id;
          //   console.log(id);
          req.body.answer.forEach((ans) => {
            connection.query(
              `insert into poll_answer(poll_id, user_id, answer) 
                values(
                ${id}, 
                ${JSON.stringify(req.body.user_id)},
                ${JSON.stringify(ans)})`
              //   function (err, result) {
              //     if (err) {
              //       throw err;
              //     }
              //   }
            );
          });
          res.status(200).send({ message: `poll ${id} added successfully!` });
        }
      });
    }
  });
};
const getPoll = (req, res) => {
  let query = `SELECT poll.poll_id, poll.user_id, poll.title, poll.description, poll.picture, poll_answer.answer_id, poll_answer.answer
  FROM poll JOIN poll_answer join follower ON poll.poll_id=poll_answer.poll_id and follower.user_following_id=poll.user_id
  where poll.user_id = ${JSON.stringify(req.params.user_id)}
  group by poll_answer.answer_id order by poll.poll_id`;

  let allPollsWithAnswer = [];
  let poll_id_hand = -1;
  connection.query(query, function (err, polls) {
    if (err) {
      throw err;
    }
    let poll;
    // console.log(polls);
    polls.forEach((p) => {
      if (p.poll_id == poll_id_hand) {
        poll.answers.push({ answer_id: p.answer_id, answer: p.answer });
      } else {
        poll_id_hand = p.poll_id;
        poll = {
          poll_id: p.poll_id,
          user_id: p.user_id,
          title: p.title,
          description: p.description,
          picture: p.picture,
          answers: [
            {
              answer_id: p.answer_id,
              answer: p.answer,
            },
          ],
        };
        allPollsWithAnswer.push(poll);
      }
    });
    res.status(200).send({ allPollsWithAnswer });
  });
};
// const getPoll = (req, res) => {
//   let sqlGetPollByUserId = `select * from poll where user_id=${req.params.user_id}`;
//   let sqlGetAnsOfPoll = `select * from poll_answer where user_id=${req.params.user_id}`;

//   connection.query(sqlGetPollByUserId, function (err, result) {
//     if (err) {
//       throw err;
//     }
//     if (result.length === 0) {
//       res.status(404).send({ message: "poll_id or user_id dosn't exists!" });
//     } else {
//       connection.query(sqlGetAnsOfPoll, function (err, res1) {
//         if (err) {
//           throw err;
//         } else {
//           res.status(200).send({ result, res1 });
//         }
//       });
//     }
//   });
// };

const updatePoll = (req, res) => {
  let sqlUpdatePoll = `update poll set 
                        title=${JSON.stringify(req.body.title)},
                        description=${JSON.stringify(req.body.description)},
                        picture=${JSON.stringify(req.body.picture)}
                        where poll_id=${JSON.stringify(req.params.poll_id)}`;

  connection.query(sqlUpdatePoll, function (err, result) {
    if (err) {
      throw err;
    }
    console.log(req.body.answers);
    req.body.answers.forEach((ans) => {
      connection.query(
        `update poll_answer set answer=${JSON.stringify(ans.answer)}
                                where answer_id=${JSON.stringify(
                                  ans.answer_id
                                )}`,
        function (err, result) {
          if (err) {
            throw err;
          }
        }
      );
    });
    res.status(200).send({ message: `poll updated successfully!` });
  });
};

const deletePoll = (req, res) => {
  console.log(req.params.poll_id);
  let sqlDelPoll = `delete from poll where poll_id = ${JSON.stringify(
    req.params.poll_id
  )}`;
  let sqlDelAnsOfPoll = `delete from poll_answer where poll_id=${JSON.stringify(
    req.params.poll_id
  )}`;

  connection.query(sqlDelPoll, function (err, result) {
    if (err) {
      throw err;
    }
    connection.query(sqlDelAnsOfPoll, function (err, result) {
      if (err) {
        throw err;
      }
      res.status(200).send({ message: "poll deleted successfully!" });
    });
  });
};

// support multipul chooses
const answerPoll = (req, res) => {
  // let sqlAnsExists = `select * from poll_answer_approval
  //                     where answer_id in (${JSON.stringify(req.body.answers)})
  //                     and user_id=${JSON.stringify(req.body.user_id)}`;

  // let sqlInsertAnsApproval = ;

  // let sqlDeleteAnsDisc = `delete from poll_answer_approval
  //                         where answer_id=${JSON.stringify(req.body.answers)}
  //                         and user_id=${JSON.stringify(req.body.user_id)}`;

  req.body.answers.forEach((ans) => {
    connection.query(
      `insert into poll_answer_approval (answer_id, user_id)
    values
    (${JSON.stringify(ans)},
    ${JSON.stringify(req.body.user_id)})`,
      function (err, likeExist) {
        if (err) {
          throw err;
        }
        console.log(likeExist);
        // if (likeExist.length === 0) {
        res.status(200).send({ message: "poll answered successfully!" });
        //   connection.query(sqlInsertAnsApproval, function (err, result) {
        //     if (err) {
        //       throw err;
        //     }
        //     res
        //       .status(200)
        //       .send({ message: "answer approval added successfully!" });
        //   });
        // } else {
        //   connection.query(sqlDeleteAnsDisc, function (err, result) {
        //     if (err) {
        //       throw err;
        //     }
        //     res
        //       .status(200)
        //       .send({ message: "answer approval removed successfully!" });
        //   });
        // }
      }
    );
  });
};

const pollsFollowing = (req, res) => {
  let query = `SELECT poll.poll_id, poll.user_id, poll.title, poll.description, poll.picture, poll_answer.answer_id, poll_answer.answer
  FROM poll JOIN poll_answer ON poll.poll_id=poll_answer.poll_id and 
  poll.user_id in (select user_following_id from follower 
  where user_id=${JSON.stringify(req.params.user_id)})
  group by poll_answer.answer_id order by poll.poll_id`;

  let allPollsWithAnswer = [];
  let poll_id_hand = -1;
  connection.query(query, function (err, polls) {
    if (err) {
      throw err;
    }
    let poll;
    // console.log(polls);
    polls.forEach((p) => {
      if (p.poll_id == poll_id_hand) {
        poll.answers.push({ answer_id: p.answer_id, answer: p.answer });
      } else {
        poll_id_hand = p.poll_id;
        poll = {
          poll_id: p.poll_id,
          user_id: p.user_id,
          title: p.title,
          description: p.description,
          picture: p.picture,
          answers: [
            {
              answer_id: p.answer_id,
              answer: p.answer,
            },
          ],
        };
        allPollsWithAnswer.push(poll);
      }
    });
    // allPollsWithAnswer.filter()
    res.status(200).send({ allPollsWithAnswer });
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
