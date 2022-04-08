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

const EditPollCard = () => {
  const { user_details, currentItem, setLoading } = useContext(AppContext);

  const [inputList, setInputList] = useState(currentItem.answers);

  const [title, setQuestion] = useState(currentItem.title);
  const [picture, setPicture] = useState(currentItem.picture);
  const [description, setDescription] = useState(currentItem.description);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const editPollSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedPoll = {
      user_id: user_details.user_id,
      title: title,
      description: description,
      answers: inputList,
      picture: picture,
    };
    await fetch(
      `http://localhost:4000/api/update_poll/${currentItem.poll_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPoll),
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

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index].answer = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { answer: "" }]);
  };

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Profile Page' />
      <ProfileHeader />
      <div style={styles.title}>
        Edit {currentItem.poll_id} {currentItem.title} poll
      </div>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <FormControl>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={(e) => editPollSubmit(e)}>
              <TextField
                id='standard-basic'
                variant='standard'
                label='Question'
                // pattern="[@]{1}[a-z][a-z]"
                required
                value={title}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <br />
              {inputList
                .map((answer) => answer.answer)
                .map((x, i) => {
                  return (
                    <>
                      <TextField
                        id='standard-basic'
                        variant='standard'
                        label='Answer'
                        placeholder='Enter Answer'
                        value={x}
                        required
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <div className='btn-box'>
                        {inputList.length !== 1 && (
                          <Button
                            className='mr10'
                            onClick={() => handleRemoveClick(i)}>
                            Remove
                          </Button>
                        )}
                        {inputList.length - 1 === i && (
                          <Button onClick={handleAddClick}>
                            Add Another Answer
                          </Button>
                        )}
                      </div>
                    </>
                  );
                })}
              <br />
              <TextField
                id='standard-basic'
                variant='standard'
                label='Description'
                // pattern="[@]{1}[a-z][a-z]"
                required
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
          Poll edited successfully ! Redirecting...
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

export default EditPollCard;
