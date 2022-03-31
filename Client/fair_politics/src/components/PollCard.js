import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { algorithms } from "./algorithmDetails";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PollCard = ({ item, inProfile }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [oldAnswers, setOldAnswers] = useState([]);
  const [newAnswers, setNewAnswers] = useState([]);
  const [orderAnswer, setOrderAnswer] = useState([]);
  const [userName, setUserName] = useState("");
  const [poll_algo, setPollAlgo] = useState("");
  const [sortingAnswers, setSortingAnswers] = useState(item.answers);
  // const [height, setHeight] = useState(0);
  useEffect(() => {
    // sort();
    getUserDetails();
    const answer_approval = [];
    item.answers.map((answer) => {
      if (answer.is_answer) {
        answer_approval.push(answer.answer_id);
      }
    });
    setNewAnswers(answer_approval);
    setOldAnswers(answer_approval);
  }, []);

  const {
    user_details,
    algo_id,
    setLoading,
    setCurrentItem,
    setFriendDetails,
    setInFriend,
  } = useContext(AppContext);

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
        return json.result[0];
      })
      .catch((err) => console.error(err));
  };

  const handleCheckbox = (answer_id) => {
    // console.log(answers);
    newAnswers.filter((answer) => answer === answer_id).length > 0
      ? setNewAnswers(newAnswers.filter((answer) => answer !== answer_id))
      : setNewAnswers([...newAnswers, answer_id]);
  };

  const answerPoll = async () => {
    setLoading(true);
    const ans = {
      answers: newAnswers,
    };
    await fetch(
      `http://localhost:4000/api/answer_poll/${user_details.user_id}`,
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
  };

  const updateAnswerPoll = async () => {
    setLoading(true);
    console.log(newAnswers);
    const ans = {
      newAnswers: newAnswers,
      oldAnswers: oldAnswers,
    };
    await fetch(
      `http://localhost:4000/api/update_answer_poll/${user_details.user_id}`,
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
  };
  const getResult = async (e) => {
    // e.preventDefault()
    setLoading(true);
    if (!inProfile) {
      getFriendAlgo();
    }
    let algo = !inProfile
      ? algorithms.filter((item) => item.id == poll_algo)[0].code
      : algorithms.filter((item) => item.id == algo_id)[0].code;
    console.log(`Poll algorithm: ${algo}`);
    return await fetch(
      `http://localhost:4000/api/poll_algo/${item.poll_id}/${algo}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setOrderAnswer(json.answers);
        // alert(json.answers);
        return json.answers;
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  const getFriendAlgo = async () => {
    await fetch(`http://localhost:4000/api/get_algorithm/${item.user_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setPollAlgo(json.result[0].algorithm_id);
      })
      .catch((err) => console.error(err));
  };

  const editPoll = (e) => {
    // console.log(item);
    setCurrentItem(item);
    history.push("/profile/editPoll");
  };
  const deletePoll = async (e) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this poll?")) {
      await fetch(`http://localhost:4000/api/delete_poll/${item.poll_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .catch((error) => console.error(error));
    }
    setLoading(false);
  };
  const sort = () => {
    console.log('getResult()');
    console.log(getResult());
    console.log(item.answers);

    var sorting = [2, 3, 1];
    console.log(sorting);
    // console.log(item)
    var result = item.answers
      .map(function (item) {
        var n = sorting.indexOf(item.answer_id);
        sorting[n] = "";
        return [n, item];
      })
      .sort()
      .map(function (j) {
        return j[1];
      });
    setSortingAnswers(result);
    console.log(result);
  };

  return (
    <div style={styles.head}>
      {!onEdit && (
        <Card style={styles.card}>
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
                  ]}>
                  <EditIcon onClick={(e) => editPoll(e)} />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton
                  sx={[
                    {
                      "&:hover": { color: "black" },
                      cursor: "pointer",
                      color: "#616161",
                    },
                  ]}>
                  <DeleteIcon onClick={(e) => deletePoll(e)} />
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

          <CardContent style={styles.description}>
            {item.description}
          </CardContent>
          <CardContent style={styles.answers}>
            {item.is_answer_poll ? (
              // if is_answer_poll true
              <>
                {sortingAnswers.map((answer) => (
                  <CardContent key={answer.answer_id}>
                    <Checkbox
                      label={answer.title}
                      defaultChecked={answer.is_answer ? true : false}
                      onClick={() => handleCheckbox(answer.answer_id)}
                    />
                    <div>
                      {answer.answer}
                      {answer.is_answer}
                    </div>
                  </CardContent>
                ))}
                <CardActions>
                  <Button
                    style={{ left: 450 }}
                    variant='outlined'
                    color='success'
                    onClick={() => updateAnswerPoll()}>
                    resubmit!
                  </Button>
                  <Button
                    style={{ left: 50 }}
                    variant='outlined'
                    color='success'
                    onClick={() => sort()}>
                    sort!
                  </Button>
                  <Button
                    style={{ left: 170 }}
                    variant='outlined'
                    color='success'
                    onClick={(e) => getResult(e)}>
                    Show result!
                  </Button>
                </CardActions>
              </>
            ) : (
              //if is_answer_poll false
              <>
                {item.answers.map((answer) => (
                  <CardContent key={answer.answer_id}>
                    <Checkbox
                      label={answer.title}
                      onClick={() => handleCheckbox(answer.answer_id)}
                    />
                    {answer.answer}
                  </CardContent>
                ))}
                <CardActions>
                  <Button
                    style={{ left: 450 }}
                    variant='outlined'
                    color='success'
                    onClick={() => answerPoll()}>
                    submit!
                  </Button>
                </CardActions>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
PollCard.deafult = {
  inProfile: false,
};
const styles = {
  card: {
    // height: 400,
    width: 600,
  },
  head: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    marginBottom: 30,
    marginRight: 30,
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
