import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useStateIfMounted } from "use-state-if-mounted";

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
  Grid,
} from "@mui/material";

const EditPollCard = ({ setDialog, setAlert, setAlertContent }) => {
  const { user_details, currentItem, setLoading, setProfilePollCards } =
    useContext(AppContext);
  let p;
  // currentItem.picture === null ? (p = "") : (p = picture);
  const [inputList, setInputList] = useStateIfMounted(currentItem.answers);

  const [title, setQuestion] = useStateIfMounted(currentItem.title);
  const [picture, setPicture] = useStateIfMounted(currentItem.picture);
  const [description, setDescription] = useStateIfMounted(
    currentItem.description
  );
  const [open, setOpen] = useStateIfMounted(false);

  const history = useHistory();

  const editPollSubmit = async (e) => {
    e.preventDefault();
    console.log("before fetch");
    setDialog(false);

    // setLoading(true);
    const updatedPoll = {
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
        console.log("inside fetch");

        console.log(json);
        // setOpen(true);
        setProfilePollCards((prevPollCards) => {
          const i = prevPollCards.findIndex(
            (poll) => poll.poll_id === currentItem.poll_id
          );
          let newPoll = prevPollCards[i];
          newPoll.title = title;
          newPoll.description = description;
          newPoll.answers = inputList;
          newPoll.picture = picture;
          let newPolls = prevPollCards.filter(
            (poll) => poll.poll_id !== currentItem.poll_id
          );
          newPolls.splice(i, 0, newPoll);
          return newPolls;
        });
        setLoading(false);
        setAlertContent("Poll Edited successfully");
        setAlert(true);
      })
      .catch((error) => console.error(error));
    // setTimeout(() => {
    //   history.goBack();
    // }, 2000);
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
    <div>
      {/* <Header title='Profile Page' />
      <ProfileHeader /> */}
      {/* <div style={styles.title}>
        Edit {currentItem.poll_id} {currentItem.title} poll
      </div> */}
      <Grid container spacing={0} direction='column' alignItems='center'>
        {/* <Card style={styles.card}> */}
        <CardContent style={styles.content}>
          <FormControl>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={editPollSubmit}>
              <TextField
                id='standard-basic'
                variant='standard'
                label='Question'
                // pattern="[@]{1}[a-z][a-z]"
                required
                value={title}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <br />
              {inputList
                .map((answer) => answer.answer)
                .map((x, i) => {
                  return (
                    <React.Fragment key={i}>
                      <TextField
                        id='standard-basic'
                        variant='standard'
                        label='Answer'
                        placeholder='Enter Answer'
                        value={x}
                        required
                        inputProps={{ maxLength: 50 }}
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
                    </React.Fragment>
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
                inputProps={{ maxLength: 1000 }}
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
                inputProps={{ maxLength: 45 }}
                onChange={(e) => setPicture(e.target.value)}
              />
              <br />
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </form>
          </FormControl>
        </CardContent>
        {/* </Card> */}
      </Grid>
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity='success'
          sx={{ width: "100%" }}>
          Poll edited successfully ! Redirecting...
        </Alert>
      </Snackbar> */}
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
  title: {
    display: "flex",
    justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    // top: 30,
    // left: -230,
  },
};

export default EditPollCard;
