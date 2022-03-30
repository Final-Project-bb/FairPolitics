import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";
const AddPoll = () => {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answers, setAnswers] = useState([]);
  const [description, setDescription] = useState("");

  const { user_details } = useContext(AppContext);

  const history = useHistory();

  const handleClick = () => {
    history.push("/profile");
  };

  const addPollSubmit = async (e) => {
    if (title === "" || description === "") {
      alert("Title or description can not be empty");
      return;
    }
    e.preventDefault();
    handleClick();
    answers.push(answer1);
    answers.push(answer2);
    answers.push(answer3);
    const newPoll = {
      title: title,
      description: description,
      picture: picture,
      answers: answers,
      user_id: user_details.user_id,
    };
    await fetch("http://localhost:4000/api/create_poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPoll),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        alert(`Poll added successfully`);
      })
      .catch((err) => console.error(err));
    setTitle("");
    setPicture("");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswers([]);
    setDescription("");
  };
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Add Poll page' />
      <ProfileHeader />
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <FormControl>
            <TextField
              helperText='Title of the question:'
              id='standard-basic'
              variant='standard'
              label='Question'
              // pattern="[@]{1}[a-z][a-z]"
              required
              // placeholder='valid tags format!'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              helperText='Answer'
              id='standard-basic'
              variant='standard'
              label='Answer #1'
              // pattern="[@]{1}[a-z][a-z]"
              required
              placeholder='a valid answer!'
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
            />
            <TextField
              helperText='Answer'
              id='standard-basic'
              variant='standard'
              label='Answer #2'
              // pattern="[@]{1}[a-z][a-z]"
              required
              placeholder='a valid answer!'
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
            />
            <TextField
              helperText='Answer'
              id='standard-basic'
              variant='standard'
              label='Answer #3'
              // pattern="[@]{1}[a-z][a-z]"
              required
              placeholder='a valid answer!'
              value={answer3}
              onChange={(e) => setAnswer3(e.target.value)}
            />
            <TextField
              helperText='Write a description of the Poll:'
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
            <TextField
              helperText='Enter a picture:'
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
            <Button variant='contained' onClick={(e) => addPollSubmit(e)}>
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
};

export default AddPoll;
