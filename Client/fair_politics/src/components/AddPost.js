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

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const { user_details } = useContext(AppContext);

  const history = useHistory();

  const handleClick = () => {
    history.push("/profile");
  };

  const addPostSubmit = async (e) => {
    if (title === "" || description === "") {
      alert("Title or description can not be empty");
      return;
    }
    e.preventDefault();
    // setTempPassFromDB("1225") // here should get the temp pass from server
    // alert(`Add Post submit works!`); // here should send pass to phone in sms
    handleClick();
    // if(tempPassFromDB===tempPass){
    //     alert(`Password approved`)
    // }
    // else{
    //     alert(`Password failed`)
    // }
    const newPost = {
      user_id: user_details.user_id,
      title: title,
      tag: tags,
      description: description,
      picture: picture,
    };
    await fetch("http://localhost:4000/api/create_Post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        alert(`post added successfully`);
      })
      .catch((err) => console.error(err));

    setTitle("");
    setTags("");
    setDescription("");
    setPicture("");
  };
  return (
    <div style={{backgroundColor: 'whitesmoke'}}>
      <Header title='Add Post page' />
      <ProfileHeader />
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <FormControl>
            <TextField
              helperText='Tagged elected officials - Example: @israel israel @other person'
              id='standard-basic'
              variant='standard'
              label='Tags'
              // pattern="[@]{1}[a-z]"
              // required
              placeholder='valid tags format!'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <TextField
              helperText='Write the title:'
              id='standard-basic'
              variant='standard'
              label='Title'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              helperText='Write a description:'
              id='standard-basic'
              variant='standard'
              label='Description'
              required
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              helperText='Enter a picture:'
              id='standard-basic'
              variant='standard'
              label='Picture'
              placeholder='Picture URL'
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
            <br />
            <Button variant='contained' onClick={(e) => addPostSubmit(e)}>
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

export default AddPost;
