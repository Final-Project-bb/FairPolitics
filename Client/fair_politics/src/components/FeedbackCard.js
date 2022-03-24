import React, { useState, useContext ,useEffect} from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  Checkbox,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const FeedbackCard = ({ item, inProfile }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [answers, setAnswers] = useState([]);

  // const [height, setHeight] = useState(0);
useEffect(() => {
  const answer_approval=[]
  item.answers.map((answer)=>{
    if(answer.is_answer){
      answer_approval.push(answer.answer_id)
    }
  })
  setAnswers(answer_approval);
}, [])

  const { user_details, setLoading, feedbackCards, setCurrentItem } =
    useContext(AppContext);

  const history = useHistory();

  const handleCheckbox = (answer_id) => {
    answers.filter((answer) => answer === answer_id).length > 0
      ? setAnswers(answers.filter((answer) => answer !== answer_id))
      : setAnswers([...answers, answer_id]);
  };

  const answerPoll = async () => {
    const ans = {
      answers: answers,
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
  };
  const updateAnswerPoll = () => {
    console.log(answers);
  }
  const editPoll = (e) => {
    // console.log(item);
    setCurrentItem(item);
    history.push("/profile/editFeedback");
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

  return (
    <div style={styles.head}>
      {!onEdit && (
        <Card style={styles.card}>
          {inProfile && (
            <CardContent style={{ display: "flex", flex: 3 }}>
              <EditIcon style={{ flex: 0.1 }} onClick={(e) => editPoll(e)} />
              <DeleteIcon
                style={{ flex: 0.1 }}
                onClick={(e) => deletePoll(e)}
              />
            </CardContent>
          )}
          <CardContent style={styles.title}>
            {item.poll_id} {item.title}
          </CardContent>

          <CardContent style={styles.description}>
            {item.description}
          </CardContent>
          <CardContent style={styles.answers}>

            {item.is_answer_poll
              ?
              // if is_answer_poll true
              <>
                {item.answers.map((answer) => (
                  <CardContent key={answer.answer_id}>
                    <Checkbox
                      label={answer.title}
                      defaultChecked={answer.is_answer ? true : false}
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
                    onClick={() => updateAnswerPoll()}>
                    resubmit!
                  </Button>
                </CardActions>
              </>

              //if is_answer_poll false
              :
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
              </>}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
FeedbackCard.deafult = {
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

export default FeedbackCard;
