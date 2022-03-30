import Header from "./Header";
import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import styled from "styled-components";
import { FaFacebook, FaSms } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { FcGoogle, FcOk } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

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
} from "@mui/material";

const Register = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [tempPass, setTempPass] = useState("");
  const [tempPassFromDB, setTempPassFromDB] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [date, setDate] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [gender, setGender] = useState("");
  const [is_public_elected, setIsPublicElected] = useState(0);
  const [description, setDescription] = useState("");
  const [semi_description, setSemiDescription] = useState("");
  const [tempPassFlag, setTempPassFlag] = useState(false);
  const [passFlag, setPassFlag] = useState(false);
  const [otherFlag, setOtherFlag] = useState(false);

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
    if (pass2 === "" || pass === "") {
      alert("Title or description can not be empty");
      return;
    }
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
  const faceBook = () => {
    alert("facebook clicked");
  };
  const gMail = () => {
    alert("Gmail clicked");
  };
  const history = useHistory();
  const handleClick = () => {
    history.push("/connection/login");
  };
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "column",
        flex: 4,
      }}>
      <Header title='Register Page' />
      {!loading && (
        <div>
          <Card style={styles.cardLeft}>
            <CardContent style={styles.content}>
              <FormControl>
                {!tempPassFlag && !passFlag && (
                  <>
                    <TextField
                      // helperText='Enter your id:'
                      id='standard-basic'
                      variant='standard'
                      label='ID'
                      pattern='[0-9]{9}'
                      required
                      placeholder='valid id number!'
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className='inputId'
                    />
                    <br />
                    {/* <label>Enter a Phone Number: </label> */}
                    <TextField
                      // helperText='Enter your id:'
                      id='standard-basic'
                      variant='standard'
                      label='Email'
                      type='email'
                      // pattern='[0]{1}[5]{1}[0-9]{8}'
                      required
                      placeholder='valid email!'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='inputEmail'
                    />
                    <br />
                    <BiMailSend onClick={(e) => emailSubmit(e)} size={30} />
                    {/* <input type='submit' /> */}
                    <br />
                  </>
                )}
                {tempPassFlag && !passFlag && (
                  <>
                    <TextField
                      // helperText='Enter a temporary password'
                      id='standard-basic'
                      variant='standard'
                      label='Temporary Password'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      // required
                      placeholder='Password from Email!'
                      value={Number(tempPass)}
                      onChange={(e) => setTempPass(Number(e.target.value))}
                    />

                    <br />
                    <Button
                      onClick={(e) => approveSubmit(e)}
                      variant='contained'
                      color='primary'
                      type='submit'>
                      submit
                    </Button>
                  </>
                )}
                {passFlag && !otherFlag && (
                  <>
                    <br />
                    <TextField
                      // helperText='Enter your final password'
                      id='standard-basic'
                      variant='standard'
                      label='Final Password'
                      type='password'
                      // pattern="[0]{1}[5]{1}[0-9]{8}"
                      // required
                      placeholder='your password!'
                      value={pass}
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
                      // required
                      // placeholder='repeat your password!'
                      value={pass2}
                      onChange={(e) => setPass2(e.target.value)}
                    />
                    <br />
                    <Button
                      onClick={(e) => approvePassword(e)}
                      variant='contained'
                      color='primary'
                      type='submit'>
                      submit
                    </Button>
                  </>
                )}
                {passFlag && otherFlag && (
                  <>
                    <div>Successful initial verification! </div>
                    <FcOk
                      style={{ position: "relative", left: 205, top: -17 }}
                    />
                    <div>Please fill in the following details correctly.</div>
                  </>
                )}
              </FormControl>
            </CardContent>
          </Card>
          {otherFlag && (
            <Card style={styles.cardRight}>
              <CardContent style={styles.content}>
                <FormControl>
                  <TextField
                    // helperText='Enter your first name'
                    id='standard-basic'
                    variant='standard'
                    label='First Name'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    // placeholder='first name!'
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <br />
                  <TextField
                    // helperText='Enter your last name'
                    id='standard-basic'
                    variant='standard'
                    label='Last Name'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    // placeholder='last name!'
                    value={last_name}
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
                    // required
                    placeholder='city!'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <br />
                  <TextField
                    // helperText='Enter your rule'
                    id='standard-basic'
                    variant='standard'
                    label='Rule'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='Rule!'
                    value={job_title}
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
                    onChange={(e) => setProfilePicture(e.target.value)}
                  />
                  <br />
                  <Button
                    onClick={(e) => registerSubmit(e)}
                    variant='contained'
                    color='primary'
                    type='submit'>
                    submit
                  </Button>{" "}
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
                    <div onClickCapture={() => faceBook()}>
                      <FaFacebook size={50} />
                      Facebook
                    </div>
                    <div onClickCapture={() => gMail()}>
                      <SiGmail size={50} />
                      Gmail
                    </div>
                  </div>
                  <br />
                  <Button onClick={() => handleClick()}>
                    already have an account ? sign in here!
                  </Button>
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
  cardLeft: {
    // height: 400,
    width: 600,
    top: 50,
    left: "5%",
    position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    justifyContent: "center",
  },
  cardRight: {
    // height: 400,
    width: 600,
    top: -45,
    left: "50%",
    position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    justifyContent: "center",
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
