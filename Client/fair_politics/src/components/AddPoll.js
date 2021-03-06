import React, { useState, useContext } from "react";
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
  CardActions,
  ButtonGroup,
  Grid,
} from "@mui/material";
const AddPoll = ({ setDialog, setAlert, setAlertContent }) => {
  const [title, setTitle] = useStateIfMounted("");
  const [picture, setPicture] = useStateIfMounted("");
  const [description, setDescription] = useStateIfMounted("");
  const [inputList, setInputList] = useStateIfMounted([""]);
  // const [open, setOpen] = useStateIfMounted(false);

  const { user_details, setLoading, setProfilePollCards } =
    useContext(AppContext);

  const history = useHistory();

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toISOString().split("T")[1].split(".")[0];

  const addPollSubmit = async (e) => {
    e.preventDefault();
    console.log("before fetch");
    setLoading(true);
    setDialog(false);

    // setTimeout(() => {
    //   history.goBack();
    // }, 2000);
    const newPoll = {
      title: title,
      description: description,
      picture: picture,
      answers: [],
      user_id: user_details.user_id,
      upload_date: `${currentDate}, ${currentTime}`,
      is_answer_poll: false,
    };
    fetch("http://localhost:4000/api/create_poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPoll),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("after fetch");

        console.log(json);
        newPoll.poll_id = json.id;
        setProfilePollCards((prevPollCards) => [...prevPollCards, newPoll]);
        setLoading(false);
        setAlertContent("Poll Added Successfully");
        setAlert(true);
      })
      .catch((error) => {
        console.error(error);
        setAlertContent("Poll Add Failed");
        setAlert(true);
      });
    setTitle("");
    setPicture("");
    setDescription("");
    setInputList([""]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = value;
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
    setInputList([...inputList, ""]);
  };

  return (
    <div>
      {/* <Header title='Add Poll page' />
      <ProfileHeader /> */}
      <Grid container spacing={0} direction='column' alignItems='center'>
        {/* <Card style={styles.card}> */}
        <CardContent style={styles.content}>
          <FormControl>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={(e) => addPollSubmit(e)}>
              <TextField
                helperText='Title of the question:'
                id='standard-basic'
                variant='standard'
                label='Question'
                // pattern="[@]{1}[a-z][a-z]"
                required
                // placeholder='valid tags format!'
                value={title}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              {inputList.map((x, i) => {
                return (
                  <React.Fragment key={i}>
                    <TextField
                      required
                      id='standard-basic'
                      variant='standard'
                      placeholder='Enter Answer'
                      label='Answer'
                      value={x}
                      inputProps={{ maxLength: 50 }}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    {/* <ButtonGroup> */}
                    {inputList.length !== 1 && (
                      <Button
                        // className='mr10'
                        onClick={() => handleRemoveClick(i)}>
                        Remove
                      </Button>
                    )}
                    {inputList.length - 1 === i && (
                      <Button onClick={handleAddClick}>
                        Add Another Answer
                      </Button>
                    )}
                    {/* </ButtonGroup> */}
                  </React.Fragment>
                );
              })}
              <TextField
                helperText='Write a description of the Poll:'
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
              <TextField
                helperText='Enter a picture:'
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
          Poll added successfully ! Redirecting...
        </Alert>
      </Snackbar> */}
    </div>
  );
};

const styles = {
  card: {
    // height: 400,
    // width: 700,
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

export default AddPoll;
