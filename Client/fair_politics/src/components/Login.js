import React from "react";
import Header from "./Header";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./Context";
import Loading from "./Loading";
import { FaFacebook, FaSms } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";

const Login = () => {
  const [onReset, setOnReset] = useState(false);
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [tempPass, setTempPass] = useState("");
  const [tempPassFromDB, setTempPassFromDB] = useState("");

  const {
    setUserDetails,
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
    alert("facebook clicked");
  };
  const gMail = () => {
    alert("Gmail clicked");
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
        // console.log(data.result[0]);
        setUserDetails(data.result[0]);
        setIsConnected(true);
        history.push("/home");
      }
    }
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
    <div style={{ backgroundColor: "whitesmoke" }}>
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
                    submit
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
                    <CardContent onClickCapture={() => faceBook()}>
                      <FaFacebook size={50} />
                      Facebook
                    </CardContent>
                    <CardContent onClickCapture={() => gMail()}>
                      <SiGmail size={50} />
                      Gmail
                    </CardContent>
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
const LoginFormStyle = styled.div`
  ${
    "" /* background: linear-gradient(135deg, rgb(11,15,67) 5%,rgb(27,100,221) ); */
  }
  ${"" /* width: 14px; */}
  ${"" /* height: 24px; */}
  ${
    "" /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */
  }
 ${"" /* background-position: 50% 50%; */}
 ${"" /* background-repeat: no-repeat; */}
  padding-left: 2rem;
  background: transparent
    linear-gradient(150deg, #025fdb 0%, #025fdb 35%, #0b3668 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
  height: 300px;
  width: 500px;
  position: relative;
  top: 40px;
  left: 550px;
  border-radius: 30px;
  ${"" /* display: flex; */}
  flex-direction:row;
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
  ${"" /* z-index: 10; */} /* Third Nav */
  /* justify-content: flex-start; */
`;
const FirstRegisterFormStyle = styled.div`
  ${
    "" /* background: linear-gradient(135deg, rgb(11,15,67) 5%,rgb(27,100,221) ); */
  }
  ${"" /* width: 14px; */}
  ${"" /* height: 24px; */}
  ${
    "" /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */
  }
 ${"" /* background-position: 50% 50%; */}
 ${"" /* background-repeat: no-repeat; */}
  padding-left: 2rem;
  background: transparent
    linear-gradient(150deg, #025fdb 0%, #025fdb 35%, #0b3668 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
  height: 260px;
  width: 360px;
  position: absolute;
  left: 50px;
  top: 220px;
  border-radius: 30px;
  ${"" /* display: flex; */}
  flex-direction:row;
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
  ${"" /* z-index: 10; */} /* Third Nav */
  /* justify-content: flex-start; */
`;
export default Login;
