const Poll = require("../models/poll");
const express = require("express");
const mysql = require("mysql");
const connection = require("../lib/db");
const algo = require("../../Algorithms/dprsequence");
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
          req.body.answers.forEach((ans) => {
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
  ,IF((select count(*) from poll_answer_approval where
         user_id=${JSON.stringify(
    req.params.user_id
  )} and answer_id=poll_answer.answer_id)=1, true, false) as "is_answer"  
    FROM poll JOIN poll_answer 
    ON poll.poll_id=poll_answer.poll_id and 
    poll.user_id =${JSON.stringify(req.params.user_id)}
    group by poll_answer.answer_id order by poll.poll_id`;

  let allPollsWithAnswer = [];
  let poll_id_hand = -1;
  connection.query(query, function (err, polls) {
    if (err) {
      throw err;
    }
    let poll;
    polls.forEach((p) => {
      if (p.poll_id == poll_id_hand) {
        if (p.is_answer === 1) {
          poll.is_answer_poll = true;
        }
        poll.answers.push({
          is_answer: p.is_answer === 1 ? true : false,
          answer_id: p.answer_id,
          answer: p.answer,
        });
      } else {
        poll_id_hand = p.poll_id;
        poll = {
          poll_id: p.poll_id,
          user_id: p.user_id,
          title: p.title,
          description: p.description,
          picture: p.picture,
          is_answer_poll: false,
          answers: [
            {
              is_answer: p.is_answer === 1 ? true : false,
              answer_id: p.answer_id,
              answer: p.answer,
            },
          ],
        };
        if (p.is_answer === 1) {
          poll.is_answer_poll = true;
        }
        allPollsWithAnswer.push(poll);
      }
    });

    res.status(200).send({ allPollsWithAnswer });
  });
};

const updatePoll = (req, res) => {
  let sqlUpdatePoll = `update poll set
                        title=${JSON.stringify(req.body.title)},
                        description=${JSON.stringify(req.body.description)},
                        picture=${JSON.stringify(req.body.picture)}
                        where poll_id=${JSON.stringify(req.params.poll_id)}`;

  let answers_id = req.body.answers.map((answer) => answer.answer_id);
  answers_id = JSON.stringify(
    answers_id.filter((answer) => answer !== undefined)
  );

  answers_id = answers_id.substring(1, answers_id.length - 1);
  let deleteUserRemovenAnswersSql = `delete from poll_answer
  where poll_id = ${JSON.stringify(req.params.poll_id)}
  and answer_id not in (${answers_id})`;

  connection.query(deleteUserRemovenAnswersSql, function (err, result) {
    if (err) {
      throw err;
    }
  });

  connection.query(sqlUpdatePoll, function (err, result) {
    if (err) {
      throw err;
    }
    req.body.answers.forEach((ans) => {
      if (ans.hasOwnProperty("answer_id")) {
        connection.query(
          `update poll_answer
        set answer=${JSON.stringify(ans.answer)}
        where
        answer_id=${JSON.stringify(ans.answer_id)}`,
          function (err, result) {
            if (err) {
              throw err;
            }
          }
        );
      } else {
        connection.query(
          `insert into poll_answer (poll_id, user_id, answer)
        values (${JSON.stringify(req.params.poll_id)}
        ,${JSON.stringify(req.body.user_id)}
        ,${JSON.stringify(ans.answer)})`,
          function (err, result) {
            if (err) {
              throw err;
            }
          }
        );
      }
    });
    res.status(200).send({ message: `poll updated successfully!` });
  });
};

const deletePoll = (req, res) => {
  // console.log(req.params.poll_id);
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
  req.body.answers.forEach((ans) => {
    connection.query(
      `insert into poll_answer_approval
       (answer_id, user_id) values
       (${JSON.stringify(ans)},
        ${JSON.stringify(req.params.user_id)})`,
      function (err, likeExist) {
        if (err) {
          throw err;
        }
        res.status(200).send({ message: "poll answered successfully!" });
      }
    );
  });
};

const updateAnswerPoll = (req, res) => {
  req.body.oldAnswers.forEach((ans) => {
    let deleteOldAnswersSql = `delete from poll_answer_approval 
    where user_id = ${JSON.stringify(req.params.user_id)} 
    and answer_id = ${JSON.stringify(ans)}`;
    connection.query(deleteOldAnswersSql, function (err, deleteOldAnswers) {
      if (err) {
        throw err;
      }
    });
  });

  req.body.newAnswers.forEach((ans) => {
    let insertNewAnswersSql = `insert into poll_answer_approval
    (answer_id, user_id) values
    (${JSON.stringify(ans)}, ${JSON.stringify(req.params.user_id)})`;
    connection.query(insertNewAnswersSql, function (err, insertNewAnswers) {
      if (err) {
        throw err;
      }
    });
  });
  res.status(200).send({ message: "poll user answer updated successfully!" });
};

const pollsFollowing = (req, res) => {
  let query = `SELECT poll.poll_id, poll.user_id, poll.title, poll.description, poll.picture, poll_answer.answer_id, poll_answer.answer 
  ,IF((select count(*) from poll_answer_approval where
         user_id=${JSON.stringify(
    req.params.user_id
  )} and answer_id=poll_answer.answer_id)=1, true, false) as "is_answer"  
    FROM poll JOIN poll_answer 
    ON poll.poll_id=poll_answer.poll_id and 
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
    polls.forEach((p) => {
      if (p.poll_id == poll_id_hand) {
        if (p.is_answer === 1) {
          poll.is_answer_poll = true;
        }
        poll.answers.push({
          is_answer: p.is_answer === 1 ? true : false,
          answer_id: p.answer_id,
          answer: p.answer,
        });
      } else {
        poll_id_hand = p.poll_id;
        poll = {
          poll_id: p.poll_id,
          user_id: p.user_id,
          title: p.title,
          description: p.description,
          picture: p.picture,
          is_answer_poll: false,
          answers: [
            {
              is_answer: p.is_answer === 1 ? true : false,
              answer_id: p.answer_id,
              answer: p.answer,
            },
          ],
        };
        if (p.is_answer === 1) {
          poll.is_answer_poll = true;
        }
        allPollsWithAnswer.push(poll);
      }
    });

    res.status(200).send({ allPollsWithAnswer });
  });
};

const pollAlgo = (req, res) => {
  var ballotts = [];
  // Should be use
  var erelSegalKing = `select poll_answer_approval.user_id,poll_answer_approval.answer_id 
  from poll_answer_approval join poll_answer on poll_answer_approval.answer_id=poll_answer.answer_id
  where poll_answer.poll_id=1
  order by poll_answer_approval.user_id`;
  // Should be use

  var getNumCand = `select answer_id from poll_answer where poll_id=${JSON.stringify(
    req.params.poll_id
  )}`;
  var getVoters = `select distinct user_id from poll_answer_approval where answer_id in 
  (select answer_id from poll_answer where poll_id=${JSON.stringify(
    req.params.poll_id
  )})`;
  connection.query(getNumCand, function (err, answers_id) {
    if (err) {
      throw err;
    }
    var c = 0;
    var namesOriginal = answers_id.map((id) => id.answer_id);
    var names = {};
    var namesKeys = [];
    for (const x of namesOriginal) {
      names[c++] = x;
    }
    for (const key in names) {
      namesKeys.push(Number(key));
    }
    var num_cand = namesOriginal.length;
    connection.query(getVoters, function (err, voters) {
      if (err) {
        throw err;
      }
      var count = 0;
      voters.forEach((voter) => {
        var getAnswerByUser = `select answer_id from poll_answer_approval where user_id=${JSON.stringify(
          voter.user_id
        )}`;
        connection.query(getAnswerByUser, function (err, answersByVoter) {
          if (err) {
            throw err;
          }
          count++;
          var temp = answersByVoter.map((id) => id.answer_id);
          var temp1 = [];
          for (const key in names) {
            for (const x of temp) {
              if (names[key] == x) {
                temp1.push(Number(key));
              }
            }
          }
          ballotts.push(temp1);
          if (count === voters.length) {
            var profile = [namesKeys, num_cand, ballotts];
            console.log(profile);
            var election = new algo(profile, req.params.algo);
            var outcomes = election.run_by_name([-1]);
            var result = outcomes[outcomes.length - 1][1];
            var answers = [];
            console.log(outcomes);
            console.log(result);
            for (const x of result) {
              answers.push(names[x]);
            }
            console.log("ballotts")
            console.log(ballotts)

            let v = []

            for (const x of ballotts) {
              for (const i of x) {
                v.push(names[i]);
              }
            }

            const orderAnswer = {};
            let sumOfUsers=ballotts.length
            const answersCount={};
            v.forEach((x) => { orderAnswer[x] = (orderAnswer[x] || 0) + 1; });
            v.forEach((x) => { answersCount[x] = (answersCount[x] || 0) + 1; });
            for (const [key, value] of Object.entries(orderAnswer)) {
              orderAnswer[key]=(value/sumOfUsers)*100;
            }
            console.log(answersCount)
            console.log(orderAnswer)
            // console.log(counts.keys())
            res.status(200).send({ answers, orderAnswer,answersCount,sumOfUsers });
          }
        });
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
  updateAnswerPoll,
  pollsFollowing,
  pollAlgo,
};
