import Header from "./Header";
import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import styled from "styled-components";
import { FaFacebook, FaSms } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";

const Register = () => {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [tempPass, setTempPass] = useState("");
  const [tempPassFromDB, setTempPassFromDB] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [date, setDate] = useState();
  const [profile_picture, setProfilePicture] = useState("");
  const [gender, setGender] = useState("");
  const [is_public_elected, setIsPublicElected] = useState(0);
  const [description, setDescription] = useState("");
  const [semi_description, setSemiDescription] = useState("");

  const { setUserDetails, setIsConnected, loading, setLoading } =
    useContext(AppContext);

  const current = new Date().toISOString().split("T")[0];
  const phoneSubmit = (event) => {
    event.preventDefault();
    setTempPassFromDB("1225"); // here should get the temp pass from server
    alert(`The temp pass is: ${tempPassFromDB}`); // here should send pass to phone in sms
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
    if (pass2 === "" || pass === "") {
      alert("Title or description can not be empty");
      return;
    }
    if (pass2 === pass) {
      alert(`Password approved`);
      authUsers();
    } else {
      alert(`Password failed`);
    }
  };
  const authUsers = () => {
    const login_details = {
      user_id: id,
      phone_number: phone,
      password: pass,
    };
    authFromDb(login_details);
  };
  const authFromDb = () => {};
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
      });
    setLoading(false);
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
                  label='Phone Number'
                  type='tel'
                  pattern='[0]{1}[5]{1}[0-9]{8}'
                  required
                  placeholder='valid phone number!'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='inputPhoneNum'
                />
                <br />
                <FaSms onClick={(e) => phoneSubmit(e)} size={30} />
                {/* <input type='submit' /> */}
                <br />
                <TextField
                  // helperText='Enter a temporary password'
                  id='standard-basic'
                  variant='standard'
                  label='Temporary Password'
                  // pattern="[0]{1}[5]{1}[0-9]{8}"
                  // required
                  placeholder='password from sms!'
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
              </FormControl>
            </CardContent>
          </Card>

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
                <div>
                  <input
                    name='gender'
                    type='radio'
                    value='Male'
                    ref={() => {
                      setGender("Male");
                    }}
                  />
                  <label>Male</label>
                  <input
                    name='gender'
                    type='radio'
                    value='Female'
                    ref={() => {
                      setGender("Female");
                    }}
                  />
                  <label>Female</label>
                </div>
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
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

const styles = {
  cardLeft: {
    // height: 400,
    width: 600,
    top: 50,
    left: "10%",
    position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    justifyContent: "center",
  },
  cardRight: {
    // height: 400,
    width: 600,
    top: -485,
    left: 1000,
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
const RegisterFormStyle = styled.div`
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
  height: 380px;
  width: 500px;
  position: relative;
  left: 850px;
  top: -150px;
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
  top: 100px;
  border-radius: 30px;
  ${"" /* display: flex; */}
  flex-direction:row;
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
  ${"" /* z-index: 10; */} /* Third Nav */
  /* justify-content: flex-start; */
`;

export default Register;
