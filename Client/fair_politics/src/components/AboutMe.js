import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import { useHistory } from "react-router-dom";
import { AppContext } from "./Context";
import styled from "styled-components";
import Loading from "./Loading";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useStateIfMounted } from "use-state-if-mounted";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  RadioGroup,
  Radio,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";

const AboutMe = () => {
  const {
    user_details,
    setUserDetails,
    setIsConnected,
    loading,
    setLoading,
    inFriend,
    friend_details,
  } = useContext(AppContext);
  // const user = window.localStorage.getItem("user");


  // const [formInputs, setformInputs] = useStateIfMounted({
  //   first_name: inFriend ? friend_details.first_name : user_details.first_name,
  //   last_name: inFriend ? friend_details.last_name : user_details.last_name,
  // });

  const [first_name, setFirstName] = useStateIfMounted(
    inFriend ? friend_details.first_name : user_details.first_name
  );
  const [last_name, setLastName] = useStateIfMounted(
    inFriend ? friend_details.last_name : user_details.last_name
  );
  const [city, setCity] = useStateIfMounted(
    inFriend ? friend_details.city : user_details.city
  );
  const [job_title, setJobTitle] = useStateIfMounted(
    inFriend ? friend_details.job_title : user_details.job_title
  );
  const [date, setDate] = useStateIfMounted(
    inFriend ? friend_details.birthdate : user_details.birthdate
  );
  const [profile_picture, setProfilePicture] = useStateIfMounted(
    inFriend ? friend_details.profile_picture : user_details.profile_picture
  );
  const [gender, setGender] = useStateIfMounted(
    inFriend ? friend_details.gender : user_details.gender
  );
  const [description, setDescription] = useStateIfMounted(
    inFriend ? friend_details.description : user_details.description
  );
  const [semi_description, setSemiDescription] = useStateIfMounted(
    inFriend ? friend_details.semi_description : user_details.semi_description
  );
  const [onEdit, setOnEdit] = useStateIfMounted(false);
  const [onDelete, setOnDelete] = useStateIfMounted(false);
  const [dialog, setDialog] = useStateIfMounted(false);

  const current = new Date().toISOString().split("T")[0];
  const history = useHistory();

  // const user_details =
  // {
  //     user_id: "1",
  //     first_name: "Israel",
  //     last_name: "Israeli",
  //     city: "Ramat gan",
  //     birthdate: "26/04/1995",
  //     job_title: "Computer Science student",
  //     description: "king",
  //     semi_description: "semi_description",
  //     profile_picture: "../images/profilePicExmple.jpg",
  //     gender: "male",
  //     age: 26,
  // };

  const editButton = () => {
    setOnDelete(false);
    setOnEdit(!onEdit);
  };

  const editSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const new_user_details = {
      user_id: user_details.user_id,
      gmail: user_details.gmail,
      first_name: first_name,
      last_name: last_name,
      city: city,
      birthdate: date,
      age: user_details.age,
      job_title: job_title,
      description: description,
      semi_description: semi_description,
      profile_picture: profile_picture,
      gender: gender,
      is_public_elected: user_details.is_public_elected,
    };
    setUserDetails(new_user_details);
    window.localStorage.setItem('user', JSON.stringify(new_user_details));
    editUserDb(new_user_details);
    setLoading(false);
    setOnEdit(false);
  };

  const editUserDb = async (new_user_details) => {
    await fetch(`http://localhost:4000/api/update_user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user_details),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => console.error(error));
  };

  const deleteUser = () => {
    setOnEdit(false);
    setOnDelete(!onDelete);
    setLoading(true);
    deletefromDb();
    setIsConnected(false);
    setOnDelete(false);
    setLoading(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isconnected");
    localStorage.removeItem("algoName");
    localStorage.removeItem("algoID");
    history.push("/");
  };

  const deletefromDb = async () => {
    await fetch(
      `http://localhost:4000/api/delete_user/${user_details.user_id}`,
      {
        method: "DELETE",
      }
    ).catch((error) => console.error(error));
  };

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const isconnected = window.localStorage.getItem("isconnected");
    setUserDetails(JSON.parse(user));
    setIsConnected(isconnected);
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem(
  //     "forminputs",
  //     JSON.stringify({
  //       first_name: first_name,
  //       last_name: last_name,
  //     })
  //   );
  //   console.log('second effect');

  // }, [first_name, last_name]);

  // useEffect(() => {
  //   const forminput = JSON.parse(window.localStorage.getItem("forminputs"));
  //   console.log(forminput);
  //   setFirstName(forminput.first_name);
  //   setLastName(forminput.last_name);
  // });

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        minHeight: 658,
        paddingBottom: 20,
      }}>
      <Header title='About Me' />
      <ProfileHeader />

      {!loading && (
        <div>
          {!inFriend && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  mt: 5,
                }}>
                <Tooltip title='Delete Account'>
                  <IconButton
                    variant='contained'
                    color='error'
                    // sx={{ marginRight: 5 }}
                    onClick={() => setDialog(true)}>
                    {/* {onDelete ? "Cancel Delete" : "Delete account"} */}
                    <DeleteIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Edit Details'>
                  <IconButton
                    variant={!onEdit ? "outlined" : "contained"}
                    color='primary'
                    onClick={() => editButton()}>
                    {/* {onEdit ? "Cancel edit" : "Edit details"} */}
                    <EditIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
          {!onEdit && (
            <div style={styles.description}>{user_details.description}</div>
          )}
          {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel() } } /> */}
          {onEdit && (
            <Card raised sx={styles.card}>
              <CardContent sx={styles.content}>
                <FormControl>
                  <TextField
                    // helperText='Enter your first name:'
                    id='standard-basic'
                    variant='standard'
                    label='First Name'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    value={first_name}
                    inputProps={{ maxLength: 45 }}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <br />
                  <TextField
                    // helperText='Enter your last name:'
                    id='standard-basic'
                    variant='standard'
                    label='Last Name'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    // placeholder='last name!'
                    value={last_name}
                    inputProps={{ maxLength: 45 }}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <br />

                  <RadioGroup
                    style={styles.radioGroup}
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'>
                    <FormControlLabel
                      value='female'
                      control={<Radio />}
                      label='Female'
                      onClick={() => setGender("Female")}
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                      onClick={() => setGender("Male")}
                    />
                  </RadioGroup>
                  <TextField
                    type='date'
                    id='standard-basic'
                    variant='standard'
                    helperText='BirthDate'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    name='birthdate'
                    inputProps={{ maxLength: 10 }}
                    max={current}
                  />
                  <br />

                  <TextField
                    // helperText='Enter your semi-description:'
                    id='standard-basic'
                    variant='standard'
                    label='Semi-Description'
                    value={semi_description}
                    inputProps={{ maxLength: 150 }}
                    onChange={(e) => setSemiDescription(e.target.value)}
                  />
                  <br />

                  <TextField
                    // helperText='Enter your description:'
                    id='standard-basic'
                    variant='standard'
                    label='Description'
                    value={description}
                    inputProps={{ maxLength: 1000 }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />

                  <TextField
                    // helperText='Enter your location:'
                    id='standard-basic'
                    variant='standard'
                    label='Location'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='location!'
                    value={city}
                    inputProps={{ maxLength: 45 }}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <br />

                  <TextField
                    // helperText='Enter your rule:'
                    id='standard-basic'
                    variant='standard'
                    label='Rule'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    value={job_title}
                    inputProps={{ maxLength: 45 }}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  <br />

                  <TextField
                    helperText="Insert your Profile's picture:"
                    id='standard-basic'
                    variant='standard'
                    label='Picture'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='Picture!'
                    value={profile_picture}
                    inputProps={{ maxLength: 200 }}
                    onChange={(e) => setProfilePicture(e.target.value)}
                  />
                  <br />
                  <Button variant='contained' onClick={(e) => editSubmit(e)}>
                    Submit
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      {loading && <Loading />}
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want delete user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button onClick={() => deleteUser()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  card: {
    width: 600,
    // my: 5,
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    mx: "auto",
    mt: 5,
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  description: {
    // display: "flex",
    // justifyContent: "space-around",
    // flexDirection: "column",
    // position: "relative",
    // // left: 280,
    // margin: 10,
    // top: 20,
    textAlign: "center",
  },
};

export default AboutMe;
