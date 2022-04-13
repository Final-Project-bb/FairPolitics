import React from "react";
import Header from "./Header";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./Context";
import Loading from "./Loading";
import { FaFacebook, FaSms } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import GoogleLogin from "react-google-login";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Icon } from "@iconify/react";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  IconButton,
} from "@mui/material";

const Login = () => {
  const [onReset, setOnReset] = useState(false);
  const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState(null);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [tempPass, setTempPass] = useState("");
  const [tempPassFromDB, setTempPassFromDB] = useState("");

  const {
    setUserDetails,
    setAlgoId,
    setIsConnected,
    loading,
    setLoading,
    setFollowings,
    setFollowers,
  } = useContext(AppContext);

  const history = useHistory();
  const handleClick = () => {
    history.push("/connection/register");
  };
  // this function made to check the first get fetch , just click on the gmail button
  // const click = async () => {
  //   const response = await fetch("http://localhost:4000/api/get_user/222");
  //   const data = await response.json();
  //   console.log(data.result[0].user_id);
  //   // setUserInfo(data);
  // };

  const faceBook = () => {
    const port = 4000;
    const openedWindow = window.open(
      `http://localhost:${port}/api/facebook`,
      "Facebook authenticate",
      "height=600,width=600"
    );
    //Note: the fetch starting when the window is closed
    let flag = true;
    while (flag) {
      if (
        confirm(
          "you have to closed the Facebook authenticate window to continue!"
        )
      ) {
        openedWindow.window.close();
        flag = false;
      }
    }
    const timer = setInterval(async () => {
      if (openedWindow.closed) {
        clearInterval(timer);
        console.log('Facebook authenticate" window closed!');
        const response = await fetch(
          `http://localhost:${port}/connection/login/facebook/success`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log("facebook here:");
            console.log(json);
            // setChosenAlgorithm(json);
          });
      }
    }, 500);
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
      let response;
      let flag = false;
      if (openedWindow.closed) {
        clearInterval(timer);
        console.log('Google authenticate" window closed!');
        response = await fetch(
          `http://localhost:${port}/connection/login/google/success`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log("Gmail here:");
            setGmail(json.emails[0].value);
            console.log(json);
            flag = true;
            return json.emails[0].value;
            // setChosenAlgorithm(json);
          });
      }
      if (flag) {
        console.log("response");
        console.log(response);
        return response;
      }
    }, 500);
  };
  const loginGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    let mail = await gMail();
    console.log("mail");
    console.log(mail);

    const response = await fetch(
      `http://localhost:4000/api/login_user_by_gmail`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: gmail }),
      }
    );
    if (response.status == 404) {
      console.log(response);
      setLoading(false);
      return;
    }
    const data = await response.json();
    if (data.result !== undefined) {
      if (data.result[0] !== undefined) {
        console.log("data.result[0]");
        console.log(data.result[0]);

        setId(data.result[0].user_id);
        setUserDetails(data.result[0]);
        setIsConnected(true);
        history.push("/home");
      }
    }

    fetchAlgoId();
    fetchFollow();
    setLoading(false);
  };

  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    const login_details = {
      user_id: id,
      phone_number: phone,
      password: password,
    };
    const response = await fetch(`http://localhost:4000/api/login_user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login_details),
    });
    if (response.status == 404) {
      console.log(response);
      setLoading(false);
      return;
    }
    const data = await response.json();
    if (data.result !== undefined) {
      if (data.result[0] !== undefined) {
        console.log(data.result[0]);
        setUserDetails(data.result[0]);
        setIsConnected(true);
        history.push("/home");
      }
    }
    fetchAlgoId();
    fetchFollow();
    setLoading(false);
  };

  const fetchFollow = async () => {
    const response = await fetch(`http://localhost:4000/api/get_follow/${id}`);
    const data = await response.json();
    console.log(data);
    setFollowings(data.following);
    setFollowers(data.follower);
  };

  const fetchAlgoId = async () => {
    const response = await fetch(
      `http://localhost:4000/api/get_algorithm/${id}`
    );
    const data = await response.json();
    setAlgoId(data.result[0].algorithm_id);
  };
  const phoneSubmit = (event) => {
    event.preventDefault();
    setTempPassFromDB("1225"); // here should get the temp pass from server
    alert(`The name you entered was: ${tempPassFromDB}`); // here should send pass to phone in sms
    // if(tempPassFromDB===tempPass){
    //     alert(`Password approved`)
    // }
    // else{
    //     alert(`Password failed`)
    // }
  };
  const approveSubmit = (event) => {
    event.preventDefault();
    if (tempPassFromDB === tempPass) {
      alert(`Password approved`);
    } else {
      alert(`Password failed`);
    }
  };
  const approvePassword = (event) => {
    event.preventDefault();
    if (pass2 === pass) {
      alert(`Password approved`);
    } else {
      alert(`Password failed`);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#212121",
        minHeight: 800,
      }}>
      <Header title='Login Page' />
      {!loading && (
        <div>
          {!onReset && (
            <Card style={styles.card}>
              <CardContent style={styles.content}>
                <FormControl>
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
                  />
                  <br />
                  <TextField
                    // helperText='Enter a password:'
                    id='standard-basic'
                    variant='standard'
                    label='Password'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    required
                    placeholder='valid password!'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />

                  {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    position: "relative",
                    left: -20,
                    top: 180,
                  }}></div> */}
                  {/* <small style={styles.small}></small> */}

                  <Button
                    onClick={(e) => login(e)}
                    variant='contained'
                    color='primary'
                    type='submit'>
                    Login
                  </Button>
                  <br />
                  <Button
                    variant='text'
                    color='primary'
                    // style={styles.forgotButton}
                    onClick={() => setOnReset(!onReset)}>
                    Forgot your password? Click Here!
                  </Button>
                  <br />
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => handleClick()}>
                    don't have an account ? sign up here!
                  </Button>
                  {/* <small style={styles.small3}>Sign in quickly!</small> */}
                  <CardContent style={styles.iconsContainer}>
                    <IconButton onClick={() => faceBook()}>
                      <Icon
                        icon='logos:facebook'
                        style={{ fontSize: "40px" }}
                      />
                    </IconButton>
                    <IconButton onClick={(e) => loginGoogle(e)}>
                      <Icon
                        icon='logos:google-gmail'
                        style={{ fontSize: "35px" }}
                      />
                    </IconButton>
                  </CardContent>
                </FormControl>
              </CardContent>
            </Card>
          )}
          {onReset && (
            <Card style={styles.card}>
              <CardContent styles={styles.content}>
                <FormControl>
                  {/* <label></label> */}
                  <TextField
                    // helperText='Enter a password:'
                    id='standard-basic'
                    variant='standard'
                    label='Phone Number'
                    type='tel'
                    pattern='[0]{1}[5]{1}[0-9]{8}'
                    required
                    // placeholder='Enter a Phone Number:'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='inputPhoneNum'
                  />
                  <br />
                  <Button
                    onClick={(e) => phoneSubmit(e)}
                    variant='contained'
                    color='primary'
                    type='submit'>
                    submit
                  </Button>
                  <br />
                  <TextField
                    helperText='Enter the temporary password you received in sms'
                    id='standard-basic'
                    variant='standard'
                    label='Temporary Password'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    // placeholder='Enter a temporary password:'
                    value={tempPass}
                    onChange={(e) => setTempPass(e.target.value)}
                  />
                  <br />
                  <Button
                    onClick={(e) => approveSubmit(e)}
                    variant='contained'
                    color='primary'
                    type='submit'>
                    submit
                  </Button>
                  <br />
                  <br />
                  <TextField
                    // helperText='Enter a password:'
                    id='standard-basic'
                    variant='standard'
                    label='Final Password'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    // placeholder='Enter your final password:'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <TextField
                    // helperText='Enter a password:'
                    id='standard-basic'
                    variant='standard'
                    label='Repeat Password'
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    // placeholder='repeat your password!'
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                  />
                  <Button
                    onClick={(e) => approvePassword()}
                    variant='contained'
                    color='primary'
                    type='submit'>
                    submit
                  </Button>
                  <br />
                  <Button
                    // style={styles.cancelForgotButton}
                    onClick={() => setOnReset(!onReset)}>
                    Go Back
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Backdrop
        sx={{ color: "#fff" }}
        open={loading}
        // onClick={() => setLoading(false)}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};
// ReactDOM.render(<MyForm />, document.getElementById('root'));
const styles = {
  head: {
    // color:"yellow",
    flex: 1,

    padding: 24,
    backgroundColor: "#eaeaea",
  },

  card: {
    // height: 400,
    width: "50%",
    left: "25%",
    top: 50,
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  content: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    // marginBottom: 30,
  },

  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },

  input: {
    position: "absolute",
    left: "140px",
    top: "30px",
    borderRadius: "10px",
    borderWidth: "3px",
    borderColor: "green",
  },
  input2: {
    position: "absolute",
    left: "140px",
    top: "80px",
    borderRadius: "10px",
    borderWidth: "3px",
    borderColor: "green",
  },
  small: {
    position: "absolute",
    left: "20px",
    top: "105px",
  },
  small2: {
    position: "absolute",
    left: "320px",
    top: "80px",
  },
  small3: {
    position: "absolute",
    left: "180px",
    top: "-20px",
  },
  title: {
    flexDirection: "row",
    // justifyContent: 'space-around',
    //   marginTop: 0,
    paddingVertical: 8,
    padding: 20,
    textDecoration: "none",
    borderWidth: 4,
    borderColor: "#20232a",
    //   borderRadius: 0,
    backgroundColor: "#61dafb",
    color: "#20232a",
    //   textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  forgotButton: {
    position: "absolute",
    left: "20px",
    top: "125px",
  },
  cancelForgotButton: {
    position: "absolute",
    left: "270px",
    top: "215px",
  },
  faceButton: {
    position: "absolute",
    left: "20px",
    top: "50px",
  },
  gmailButton: {
    position: "absolute",
    left: "20px",
    top: "80px",
  },
  signUpButton: {
    position: "absolute",
    left: "135px",
    top: "265px",
  },
};

export default Login;
