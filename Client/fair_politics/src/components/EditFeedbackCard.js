import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  Avatar,
} from "@mui/material";

const EditFeedbackCard = () => {
  const { currentItem, setLoading } = useContext(AppContext);

  const [title, setQuestion] = useState(currentItem.title);
  const [picture, setPicture] = useState(currentItem.picture);
  const [answer1, setAnswer1] = useState(currentItem.answers[0].answer);
  const [answer2, setAnswer2] = useState(currentItem.answers[1].answer);
  const [answer3, setAnswer3] = useState(currentItem.answers[2].answer);
  const [description, setDescription] = useState(currentItem.description);

  const history = useHistory();

  const editFeedbackSubmit = async (e) => {
    if (title === "" || description === "") {
      alert("Title or description can not be empty");
      return;
    }
    if (
      window.confirm("Are you sure you want to submit changes on this poll?")
    ) {
      e.preventDefault();
      setLoading(true);
      const answers = [
        { answer_id: currentItem.answers[0].answer_id, answer: answer1 },
        { answer_id: currentItem.answers[1].answer_id, answer: answer2 },
        { answer_id: currentItem.answers[2].answer_id, answer: answer3 },
      ];
      const updatedFeedback = {
        title: title,
        description: description,
        answers: answers,
        picture: picture,
      };
      await fetch(
        `http://localhost:4000/api/update_poll/${currentItem.poll_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFeedback),
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        })
        .catch((error) => console.error(error));
      history.push("/profile");
      setLoading(false);
    }
  };
  return (
    <div style={{backgroundColor:'whitesmoke'}}>
      <Header title='Profile Page' />
      <ProfileHeader />
      <div style={styles.title}>
        Edit {currentItem.poll_id} {currentItem.title} poll
      </div>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <FormControl onSubmit={(e) => editFeedbackSubmit(e)}>
            <TextField
              id='standard-basic'
              variant='standard'
              label='Question'
              // pattern="[@]{1}[a-z][a-z]"
              // required
              placeholder='valid tags format!'
              value={title}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <br />
            {/* <small>@name1 @name2... requird Exmple:@israel israel @other person</small><br /> */}
            {/* <label>how many answer?</label>
                <input
                    type="number"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid number!'
                    value={answerNum}
                    onChange={(e) => setAnswerNum(e.target.value)}
                /><br /> */}
            <TextField
              id='standard-basic'
              variant='standard'
              label='Answer #1'
              // pattern="[@]{1}[a-z][a-z]"
              // required
              placeholder='a valid answer!'
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
            />
            <br />
            <TextField
              id='standard-basic'
              variant='standard'
              label='Answer #2'
              // pattern="[@]{1}[a-z][a-z]"
              // required
              placeholder='a valid answer!'
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
            />
            <br />
            <TextField
              id='standard-basic'
              variant='standard'
              label='Answer #3'
              // pattern="[@]{1}[a-z][a-z]"
              // required
              placeholder='a valid answer!'
              value={answer3}
              onChange={(e) => setAnswer3(e.target.value)}
            />
            <br />
            <TextField
              id='standard-basic'
              variant='standard'
              label='Description'
              // pattern="[@]{1}[a-z][a-z]"
              // required
              multiline
              placeholder='valid description!'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <TextField
              id='standard-basic'
              variant='standard'
              label='Picture'
              // pattern="[@]{1}[a-z][a-z]"
              // required
              placeholder='valid picture!'
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
            <br />
            <Button variant='contained' onClick={(e) => editFeedbackSubmit(e)}>
              Submit
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  card: {
    // height: 400,
    width: 600,
    top: 50,
    left: "30%",
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    // marginBottom: 30,
  },
  title: {
    display: "flex",
    justifyContent: "space-around",
    // flexDirection: 'row',
    position: "relative",
    // marginLeft:10,
    fontSize: 25,
    top: 30,
    left: -230,
  },
};

export default EditFeedbackCard;
