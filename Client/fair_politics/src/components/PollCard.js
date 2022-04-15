import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { algorithms } from "./algorithmDetails";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  Checkbox,
  IconButton,
  Avatar,
  Grid,
  Tooltip,
  Alert,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PollCard = ({ item, inProfile, setSnack }) => {
  const {
    user_details,
    algo_id,
    setLoading,
    setCurrentItem,
    setFriendDetails,
    setInFriend,
    setProfilePollCards,
  } = useContext(AppContext);

  const [showResults, setShowResults] = useState(item.is_answer_poll);
  const [newAnswers, setNewAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [poll_algo, setPollAlgo] = useState(1);
  const [sortedAnswers, setSortedAnswers] = useState(item.answers);
  const [dialog, setDialog] = useState(false);

  let algoName = !inProfile
    ? algorithms.filter((item) => item.id == poll_algo)[0].title
    : algorithms.filter((item) => item.id == algo_id)[0].title;

  useEffect(() => {
    // sort();
    algoName = !inProfile
      ? algorithms.filter((item) => item.id == poll_algo)[0].title
      : algorithms.filter((item) => item.id == algo_id)[0].title;
    getUserDetails();
    getResult();
    const answer_approval = [];
    item.answers.map((answer) => {
      if (answer.is_answer) {
        answer_approval.push(answer.answer_id);
      }
    });
    setNewAnswers(answer_approval);

    return () => {};
  }, []);

  const history = useHistory();

  const FriendProfileRef = async () => {
    let id = item.user_id;
    // console.log(id);

    await fetch(`http://localhost:4000/api/get_user_by_id/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result[0]);
        setFriendDetails(json.result[0]);
      })
      .catch((err) => console.error(err));
    setInFriend(true);
    history.push("/FriendProfile");
  };

  const getUserDetails = async () => {
    let id = item.user_id;

    await fetch(`http://localhost:4000/api/get_user_by_id/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.result[0]);
        setUserName({
          first_name: json.result[0].first_name,
          last_name: json.result[0].last_name,
        });
        // return json.result[0];
      })
      .catch((err) => console.error(err));
  };

  const getFriendAlgo = async () => {
    await fetch(`http://localhost:4000/api/get_algorithm/${item.user_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        json.result[0] !== undefined &&
          setPollAlgo(json.result[0].algorithm_id);
      })
      .catch((err) => console.error(err));
  };

  // const answerPoll = async () => {
  //   setLoading(true);
  //   const ans = {
  //     answers: newAnswers,
  //   };
  //   await fetch(
  //     `http://localhost:4000/api/answer_poll/${user_details.user_id}`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(ans),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.error(err));
  //   setLoading(false);
  // };

  const sort = async (e) => {
    // e.preventDefault()
    // setLoading(true);
    if (!inProfile) {
      getFriendAlgo();
    }
    let algo = !inProfile
      ? algorithms.filter((item) => item.id == poll_algo)[0].code
      : algorithms.filter((item) => item.id == algo_id)[0].code;
    // console.log(`Poll algorithm: ${algo}`);
    return await fetch(
      `http://localhost:4000/api/poll_algo/${item.poll_id}/${algo}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        // setOrderAnswer(json.answers);
        // alert(json.answers);
        // console.log(json);
        // console.log("json.orderAnswer");
        // console.log(json.orderAnswer);
        return json;
      })
      .catch((err) => console.error(err));
    // setLoading(false);
  };

  const getResult = async () => {
    // console.log("getResult()");
    // console.log(await getResult());
    // console.log(orderAnswer);
    // console.log("item.answers");
    // console.log(item.answers);
    let data = await sort();
    let sorting = data.answers;
    let order = data.orderAnswer;
    let count = data.answersCount;
    let sumOfUsers = data.sumOfUsers;
    // console.log("sorting");
    // console.log(sorting);
    // console.log("order");
    // console.log(order);
    // console.log(item)
    var result = item.answers
      .map((item) => {
        var n = sorting.indexOf(item.answer_id);
        sorting[n] = "";
        return [n, item];
      })
      .sort()
      .map((j) => {
        return j[1];
      });
    // setIsSortingPress(true);
    result.forEach((e) => {
      e.percents = order[e.answer_id] == undefined ? 0 : order[e.answer_id];
      e.answerCount = count[e.answer_id] == undefined ? 0 : count[e.answer_id];
      e.sumOfUsers = sumOfUsers;
    });
    // result.press=true;
    // console.log("result");
    // console.log(result);
    setSortedAnswers(result);
    item.answers = result;
    item.press = true;

    // console.log(orderAnswer);
    // console.log("new item.answers");
    // console.log(item.answers);
    // console.log("new item.press");
    // console.log(item.press);
    setLoading(false);
  };

  const editPoll = (e) => {
    // console.log(item);
    setCurrentItem(item);
    history.push("/profile/editPoll");
  };

  const deletePoll = async (e) => {
    setLoading(true);
    await fetch(`http://localhost:4000/api/delete_poll/${item.poll_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
        setSnack(true);
        setProfilePollCards((prev) => {
          return prev.filter((poll) => poll.poll_id !== item.poll_id);
        });
      })
      .catch((error) => console.error(error));

    setDialog(false);
    setLoading(false);
  };

  const handleCheckbox = (answer_id) => {
    // console.log(answers);
    newAnswers.filter((answer) => answer === answer_id).length > 0
      ? setNewAnswers((newAnswers) => {
          return newAnswers.filter((answer) => answer !== answer_id);
        })
      : setNewAnswers([...newAnswers, answer_id]);

    console.log("newAnswersFromHandle");
    console.log(newAnswers);
  };

  const updateAnswerPoll = async () => {
    setLoading(true);
    console.log("newAnswers");
    console.log(newAnswers);
    const ans = {
      newAnswers: newAnswers,
    };
    await fetch(
      `http://localhost:4000/api/update_answer_poll/${user_details.user_id}/${item.poll_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ans),
      }
    )
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
    setLoading(false);
    console.log("sortedAnswers");
    console.log(sortedAnswers);
    console.log("newAnswers");
    console.log(newAnswers);

    let updateAnswers = sortedAnswers.map((answer) => {
      if (newAnswers.includes(answer.answer_id)) {
        answer.is_answer = true;
      } else {
        answer.is_answer = false;
      }
      return answer;
    });
    // console.log("before");
    // item.answers= updateAnswers;
    // console.log("before1");
    setSortedAnswers(updateAnswers);
    // const answer_approval = [];
    // item.answers.map((answer) => {
    //   if (answer.is_answer) {
    //     answer_approval.push(answer.answer_id);
    //   }
    // });
    // setNewAnswers(answer_approval);
    // let data = updateAnswers.map(ans=>{if(ans.is_answer){ans.answer_id}})
    // console.log("data"+data)
    // // setNewAnswers([])
    console.log("updateAnswers");
    console.log(updateAnswers);

    // setSortedAnswers((prevAnswers) => {
    //   let newanswers = prevAnswers.map(answer => {
    //     if (newAnswers.includes(answer.answer_id)) {
    //       answer.is_answer = true;
    //     } else {
    //       answer.is_answer = false;
    //     }
    //   })
    //   return newanswers;
    // });
  };

  return (
    <div style={styles.head}>
      <Card raised style={styles.card}>
        {inProfile && (
          <CardContent style={{ display: "flex", flex: 3 }}>
            <Tooltip title='Edit'>
              <IconButton
                sx={[
                  {
                    "&:hover": { color: "black" },
                    cursor: "pointer",
                    color: "#616161",
                  },
                ]}
                onClick={(e) => editPoll(e)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton
                onClick={() => setDialog(true)}
                sx={[
                  {
                    "&:hover": { color: "black" },
                    cursor: "pointer",
                    color: "#616161",
                  },
                ]}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardContent>
        )}

        <CardContent style={{ display: "block", verticalAlign: "middle" }}>
          <Tooltip title='Go To Profile'>
            <IconButton onClick={FriendProfileRef} sx={{ p: 0 }}>
              <Grid container direction='column' alignItems='center'>
                <Grid item>
                  <Avatar
                    alt='Remy Sharp'
                    src={
                      require("../images/profilePicExmple.jpg")
                      //user_details.profile_picture
                    }
                  />
                </Grid>
                <Grid item fontSize='small' style={{ marginTop: 8 }}>
                  {/* {item.user_id} */}
                  {userName.first_name} {userName.last_name}
                </Grid>
              </Grid>
            </IconButton>
          </Tooltip>
        </CardContent>
        <CardContent style={styles.title}>
          {item.poll_id} {item.title}
        </CardContent>

        <CardContent style={styles.description}>{item.description}</CardContent>
        <CardContent style={styles.answers}>
          <>
            {sortedAnswers.map((answer) => (
              <CardContent key={answer.answer_id}>
                {!showResults ? (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={answer.is_answer}
                          onChange={() => handleCheckbox(answer.answer_id)}
                        />
                      }
                      label={answer.answer}
                    />
                  </>
                ) : (
                  <>
                    <div>
                      {answer.answer}
                      {answer.is_answer}
                    </div>
                    <div style={{ color: "green" }}>
                      {`Answered: ${answer.percents}%`}
                      {` sum: ${answer.answerCount} users out of ${answer.sumOfUsers}`}
                    </div>
                  </>
                )}
              </CardContent>
            ))}
            <CardActions>
              {showResults && (
                <Box
                  sx={{
                    position: "relative",
                    m: 3,
                    color: "#bf360c",
                    fontStyle: "italic",
                    textAlign: "right",
                    fontSize: 13,
                  }}>
                  {`Results Computed By ${algoName}`}
                </Box>
              )}
              {item.is_answer_poll && (
                <Button
                  sx={{ marginLeft: "auto" }}
                  // variant='outlined'
                  color='success'
                  onClick={(e) => {
                    setShowResults(!showResults);
                    console.log("newanswers: " + newAnswers);
                  }}>
                  {!showResults ? "Show Results" : "Reanswer Poll"}
                </Button>
              )}
              {!showResults && (
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant='outlined'
                  color='success'
                  onClick={() => updateAnswerPoll()}>
                  Submit!
                </Button>
              )}
            </CardActions>
          </>
        </CardContent>
      </Card>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Delete Poll</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want delete this poll?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button onClick={(e) => deletePoll(e)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
PollCard.deafult = {
  inProfile: false,
};
const styles = {
  head: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 30,
    width: "100%",
  },
  card: {
    // height: 400,
    width: "80%",
  },

  title: {
    display: "flex",
    justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    // top: 10,
    // right:150
  },
  description: {
    fontSize: 22,
    fontWeight: 22,
  },
  text: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "colmun",
    position: "relative",
    // marginLeft:10,
    top: 10,
    left: -15,
  },
  answers: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    position: "relative",
    // marginLeft:10,
    top: 15,
    // right: 10,
  },
};

export default PollCard;
