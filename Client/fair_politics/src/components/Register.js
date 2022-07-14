import Header from "./Header";
import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import styled from "styled-components";
import { BiMailSend } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { FcGoogle, FcOk } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import { useStateIfMounted } from "use-state-if-mounted";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";

const Register = () => {
  const [id, setId] = useStateIfMounted("");
  const [email, setEmail] = useStateIfMounted("");
  const [gmail, setGmail] = useStateIfMounted(null);
  const [phone, setPhone] = useStateIfMounted("");
  const [pass, setPass] = useStateIfMounted("");
  const [pass2, setPass2] = useStateIfMounted("");
  const [tempPass, setTempPass] = useStateIfMounted("");
  const [tempPassFromDB, setTempPassFromDB] = useStateIfMounted("");
  const [first_name, setFirstName] = useStateIfMounted("");
  const [last_name, setLastName] = useStateIfMounted("");
  const [city, setCity] = useStateIfMounted("");
  const [job_title, setJobTitle] = useStateIfMounted("");
  const [date, setDate] = useStateIfMounted("");
  const [profile_picture, setProfilePicture] = useStateIfMounted("");
  const [gender, setGender] = useStateIfMounted("");
  const [is_public_elected, setIsPublicElected] = useStateIfMounted(0);
  const [description, setDescription] = useStateIfMounted("");
  const [semi_description, setSemiDescription] = useStateIfMounted("");
  const [tempPassFlag, setTempPassFlag] = useStateIfMounted(false);
  const [passFlag, setPassFlag] = useStateIfMounted(false);
  const [otherFlag, setOtherFlag] = useStateIfMounted(false);
  // const [isGoogleAuth, setIsGoogleAuth] = useStateIfMounted(false);

  const { setUserDetails, setIsConnected, loading, setLoading, setAlgoId } =
    useContext(AppContext);

  const current = new Date().toISOString().split("T")[0];
  const emailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (await checkId()) {
      console.log(true);
      const emailField = {
        email: email,
      };

      await fetch("http://localhost:4000/api/add_user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailField),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json.code);
          if (json.code == undefined) {
            alert("email not found!");
          } else {
            setTempPassFromDB(Number(json.code));
            setTempPassFlag(true);
          }
        });
    } else {
      alert("id alread exist!");
    }

    setLoading(false);
  };
  const checkId = async (e) => {
    const response = await fetch(
      `http://localhost:4000/api/get_user_by_id/${id}`
    );
    if (response.status === 200) {
      return false;
    }
    return true;
  };
  const approveSubmit = (event) => {
    event.preventDefault();
    if (tempPassFromDB == tempPass) {
      alert(`Password approved ${tempPassFromDB}=${tempPass}`);
      setPassFlag(true);
    } else {
      alert(`Password failed ${tempPassFromDB}!=${tempPass}`);
    }
  };
  const approvePassword = (event) => {
    event.preventDefault();
    if (pass2 === pass) {
      alert(`Password approved`);
      setOtherFlag(true);
    } else {
      alert(`Password failed`);
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    const newUser = {
      user_id: id,
      password: pass,
      email: email,
      gmail: gmail,
      phone_number: phone,
      first_name: first_name,
      last_name: last_name,
      city: city,
      birthdate: date,
      job_title: job_title,
      description: description,
      semi_description: semi_description,
      profile_picture: profile_picture,
      gender: gender,
      is_public_elected: is_public_elected,
    };
    addNewUserToDb(newUser);
  };

  const addNewUserToDb = async (newUser) => {
    await fetch("http://localhost:4000/api/create_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.message);
        if (json.status === 200) {
          history.push("/connection/login");
        }
        // if(json.status===400){
        else {
          alert(json.message);
          console.log(JSON.stringify(json.message));
          setAlgorithmChosen(0);
          setTempPassFlag(false);
          setPassFlag(false);
          setOtherFlag(false);
          handleClick();
        }
      });
    setLoading(false);
  };
  const setAlgorithmChosen = async (algoID) => {
    setAlgoId(algoID);
    await fetch(`http://localhost:4000/api/choose_algorithm/${id}/${algoID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // setChosenAlgorithm(json);
      })
      .catch((err) => console.error(err));
  };

  const gMail = async () => {
    const port = 4000;
    const openedWindow = window.open(
      `http://localhost:${port}/api/google`,
      "Google authenticate",
      "height=600,width=600"
    );
    //Note: the fetch starting when the window is closed
    let flag = true;
    while (flag) {
      if (
        confirm(
          "you have to closed the Google authenticate window to continue!"
        )
      ) {
        openedWindow.window.close();
        flag = false;
      }
    }
    const timer = setInterval(async () => {
      if (openedWindow.closed) {
        clearInterval(timer);
        console.log('Google authenticate" window closed!');
        const response = await fetch(
          `http://localhost:${port}/connection/login/google/success`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log("Gmail here:");
            setFirstName(json.name.givenName);
            setLastName(json.name.familyName);
            setProfilePicture(json.photos[0].value);
            setGmail(json.emails[0].value);
            // setIsGoogleAuth(true);
            console.log(json);
            // setChosenAlgorithm(json);
          });
      }
    }, 500);
  };
  const history = useHistory();
  const handleClick = () => {
    history.push("/connection/login");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 4,
        backgroundColor: "#212121",
        minHeight: 800,
      }}>
      <Header title='Register Page' />
      {!loading && (
        <div>
          <Card sx={styles.card}>
            <CardContent sx={styles.content}>
              {!tempPassFlag && !passFlag && (
                <FormControl>
                  <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={(e) => emailSubmit(e)}>
                    <TextField
                      // helperText='Enter your id:'
                      id='standard-basic'
                      variant='standard'
                      label='ID'
                      pattern='[0-9]{9}'
                      required
                      placeholder='Valid id number'
                      inputProps={{ maxLength: 9 }}
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className='inputId'
                    />
                    <br />
                    <TextField
                      helperText='You will get Confirmation Email to the address you type here:'
                      id='standard-basic'
                      variant='standard'
                      label='Email'
                      type='email'
                      // pattern='[0]{1}[5]{1}[0-9]{8}'
                      required
                      placeholder='Valid email'
                      value={email}
                      inputProps={{ maxLength: 200 }}
                      onChange={(e) => setEmail(e.target.value)}
                      className='inputEmail'
                    />
                    <br />
                    <Tooltip title='Send'>
                      <Button
                        sx={[{ "&:hover": { backgroundColor: "white" } }]}
                        type='submit'>
                        <BiMailSend size={30} />
                      </Button>
                    </Tooltip>
                  </form>
                </FormControl>
              )}
              {tempPassFlag && !passFlag && (
                <FormControl>
                  <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={(e) => approveSubmit(e)}>
                    <TextField
                      // helperText='Enter a temporary password'
                      id='standard-basic'
                      variant='standard'
                      label='Temporary Password'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      placeholder='Password from Email!'
                      inputProps={{ maxLength: 6 }}
                      value={Number(tempPass)}
                      onChange={(e) => setTempPass(Number(e.target.value))}
                    />

                    <br />
                    <Button variant='contained' color='primary' type='submit'>
                      submit
                    </Button>
                  </form>
                </FormControl>
              )}
              {passFlag && !otherFlag && (
                <FormControl>
                  <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={(e) => approvePassword(e)}>
                    <TextField
                      // helperText='Enter your final password'
                      id='standard-basic'
                      variant='standard'
                      label='Final Password'
                      type='password'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      placeholder='your password!'
                      value={pass}
                      inputProps={{ maxLength: 45 }}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your final password again'
                      id='standard-basic'
                      variant='standard'
                      label='Repeat Password'
                      type='password'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      // placeholder='repeat your password!'
                      value={pass2}
                      inputProps={{ maxLength: 45 }}
                      onChange={(e) => setPass2(e.target.value)}
                    />
                    <br />
                    <Button variant='contained' color='primary' type='submit'>
                      submit
                    </Button>
                  </form>
                </FormControl>
              )}
              {otherFlag && (
                <>
                  <div>Successful initial verification! </div>
                  <FcOk
                    style={{ position: "relative", left: "75%", top: -17 }}
                  />
                  <div>Please fill in the following details correctly.</div>
                </>
              )}
            </CardContent>
          </Card>
          {otherFlag && (
            <Card sx={styles.card}>
              <CardContent sx={styles.content}>
                <FormControl>
                  <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={(e) => registerSubmit(e)}>
                    <TextField
                      // helperText='Enter your first name'
                      id='standard-basic'
                      variant='standard'
                      label='First Name'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      // placeholder='first name!'
                      value={first_name}
                      inputProps={{ maxLength: 45 }}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your last name'
                      id='standard-basic'
                      variant='standard'
                      label='Last Name'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      // placeholder='last name!'
                      value={last_name}
                      inputProps={{ maxLength: 45 }}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your id:'
                      id='standard-basic'
                      variant='standard'
                      label='Phone'
                      type='tel'
                      pattern='[0]{1}[5]{1}[0-9]{8}'
                      // required
                      placeholder='valid phone number!'
                      value={phone}
                      inputProps={{ maxLength: 10 }}
                      onChange={(e) => setPhone(e.target.value)}
                      className='inputEmail'
                    />
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
                    <br />
                    <TextField
                      helperText='Enter your Birth Of Date'
                      id='standard-basic'
                      variant='standard'
                      // label='Birth Date'
                      type='date'
                      placeholder='Enter BirthDate'
                      value={date}
                      inputProps={{ maxLength: 10 }}
                      onChange={(e) => setDate(e.target.value)}
                      name='birthdate'
                      max={current}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your location'
                      id='standard-basic'
                      variant='standard'
                      label='Location'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      placeholder='city!'
                      value={city}
                      inputProps={{ maxLength: 45 }}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your rule'
                      id='standard-basic'
                      variant='standard'
                      label='Rule'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      required
                      placeholder='Rule!'
                      value={job_title}
                      inputProps={{ maxLength: 45 }}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your semi-description'
                      id='standard-basic'
                      variant='standard'
                      label='Semi-Description'
                      // placeholder='semi describe yourself!'
                      value={semi_description}
                      inputProps={{ maxLength: 150 }}
                      onChange={(e) => setSemiDescription(e.target.value)}
                    />
                    <br />
                    <TextField
                      // helperText='Enter your description'
                      id='standard-basic'
                      variant='standard'
                      label='Description'
                      placeholder='describe yourself!'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      inputProps={{ maxLength: 1000 }}
                    />
                    <br />
                    <TextField
                      // helperText='Insert your Profile's picture'
                      id='standard-basic'
                      variant='standard'
                      label='Profile Picture'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      // required
                      placeholder='Picture!'
                      value={profile_picture}
                      inputProps={{ maxLength: 200 }}
                      onChange={(e) => setProfilePicture(e.target.value)}
                    />
                    <br />
                    <Button variant='contained' color='primary' type='submit'>
                      submit
                    </Button>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        position: "relative",
                        alignItems: "center",
                        // left: -20,
                      }}>
                      <Tooltip title='Register via Gmail'>
                        <Button
                          sx={[
                            {
                              "&:hover": { backgroundColor: "white" },
                              fontSize: "35px",
                            },
                          ]}
                          onClick={() => gMail()}>
                          <Icon icon='logos:google-gmail' />
                        </Button>
                      </Tooltip>
                    </div>
                    <br />
                    <Button onClick={() => handleClick()}>
                      already have an account ? sign in here!
                    </Button>
                  </form>
                </FormControl>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      {loading && (
        <Backdrop
          sx={{ color: "#fff" }}
          open={loading}
          onClick={() => setLoading(false)}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </div>
  );
};

const styles = {
  card: {
    // height: 400,
    width: "50%",
    left: "25%",
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    my: 10,
  },
  cardRight: {
    // height: 400,
    width: 600,
    // top: -45,
    // left: "50%",
    position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    // marginBottom: 30,
  },

  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
};

export default Register;
