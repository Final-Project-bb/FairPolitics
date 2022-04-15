import React, { useState, useContext } from "react";
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
  CardActions,
  Grid,
} from "@mui/material";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [open, setOpen] = useState(false);

  const { user_details } = useContext(AppContext);

  const history = useHistory();

  const addPostSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      history.goBack();
    }, 2000);
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
        setOpen(true);
      })
      .catch((err) => console.error(err));
    setTitle("");
    setTags("");
    setDescription("");
    setPicture("");
  };
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Add Post page' />
      <ProfileHeader />
      <Grid container spacing={0} direction='column' alignItems='center'>
        <Card sx={styles.card}>
          <CardContent style={styles.content}>
            <FormControl>
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(e) => addPostSubmit(e)}>
                <TextField
                  helperText='Tagged elected officials - Example: @israel israel @other person'
                  id='standard-basic'
                  variant='standard'
                  label='Tags'
                  // pattern="[@]{1}[a-z]"
                  // required
                  placeholder='valid tags format!'
                  value={tags}
                  inputProps={{ maxLength: 45 }}
                  onChange={(e) => setTags(e.target.value)}
                />

                <TextField
                  helperText='Write the title:'
                  id='standard-basic'
                  variant='standard'
                  label='Title'
                  required
                  value={title}
                  inputProps={{ maxLength: 45 }}
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
                  inputProps={{ maxLength: 1000 }}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  helperText='Enter a picture:'
                  id='standard-basic'
                  variant='standard'
                  label='Picture'
                  placeholder='Picture URL'
                  value={picture}
                  inputProps={{ maxLength: 200 }}
                  onChange={(e) => setPicture(e.target.value)}
                />
                <br />
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
              </form>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity='success'
          sx={{ width: "100%" }}>
          Post added successfully ! Redirecting...
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  card: {
    // height: 400,
    width: 700,
    // top: 50,
    // left: "30%",
    // display: "flex",
    // justifyContent: "space-around",
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    margin: 5,
  },
  content: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    // marginBottom: 30,
  },
};

export default AddPost;
