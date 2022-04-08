import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  Avatar,
} from "@mui/material";

const EditPostCard = () => {
  const { currentItem, setLoading } = useContext(AppContext);

  const [title, setTitle] = useState(currentItem.title);
  const [tag, setTag] = useState(currentItem.tag);
  const [description, setDescription] = useState(currentItem.description);
  const [picture, setPicture] = useState(currentItem.picture);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const editPostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedPost = {
      title: title,
      description: description,
      tag: tag,
      picture: picture,
    };
    await fetch(
      `http://localhost:4000/api/update_Post/${currentItem.post_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setOpen(true);
      })
      .catch((error) => console.error(error));
    setTimeout(() => {
      history.goBack();
    }, 2000);
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Profile Page' />
      <ProfileHeader />
      <div style={styles.title}>
        Edit {currentItem.post_id} {currentItem.title} Post
      </div>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <FormControl>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={(e) => editPostSubmit(e)}>
              <TextField
                helperText='Tagged elected officials - Example: @israel israel @other person'
                id='standard-basic'
                variant='standard'
                label='Tags'
                // pattern="[@]{1}[a-z]"
                // required
                // placeholder='valid tag format!'
                // className='tagInput'
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <br />
              <TextField
                id='standard-basic'
                variant='standard'
                label='Title'
                // pattern="[@]{1}[a-z][a-z]"
                required
                placeholder='a valid title!'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <TextField
                id='standard-basic'
                variant='standard'
                label='Description'
                // pattern="[@]{1}[a-z][a-z]"
                required
                aria-multiline
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
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </form>
          </FormControl>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity='success'
          sx={{ width: "100%" }}>
          Post edited successfully ! Redirecting...
        </Alert>
      </Snackbar>
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

export default EditPostCard;
