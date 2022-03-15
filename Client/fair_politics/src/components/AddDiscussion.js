import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";

const AddDiscussion = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const { user_details } = useContext(AppContext);

  const history = useHistory();

  const handleClick = () => {
    history.push("/profile");
  };

  const addDiscussionSubmit = async (e) => {
    if (title === "" || description === "") {
      alert("Title or description can not be empty");
      return;
    }
    e.preventDefault();
    // setTempPassFromDB("1225") // here should get the temp pass from server
    // alert(`Add discussion submit works!`); // here should send pass to phone in sms
    handleClick();
    // if(tempPassFromDB===tempPass){
    //     alert(`Password approved`)
    // }
    // else{
    //     alert(`Password failed`)
    // }
    const newPost = {
      user_id: user_details.user_id,
      title: title,
      tag: tags,
      description: description,
      picture: picture,
    };
    await fetch("http://localhost:4000/api/create_discussion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        alert(`post added successfully`);
      })
      .catch((err) => console.error(err));

    setTitle("");
    setTags("");
    setDescription("");
    setPicture("");
  };
  return (
    <div style={{backgroundColor: 'whitesmoke'}}>
      <Header title='Add Discussion page' />
      <ProfileHeader />
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <FormControl>
            <TextField
              helperText='Tagged elected officials - Example: @israel israel @other person'
              id='standard-basic'
              variant='standard'
              label='Tags'
              // pattern="[@]{1}[a-z]"
              // required
              placeholder='valid tags format!'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <TextField
              helperText='Write the title:'
              id='standard-basic'
              variant='standard'
              label='Title'
              required
              value={title}
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
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              helperText='Enter a picture:'
              id='standard-basic'
              variant='standard'
              label='Picture'
              placeholder='Picture URL'
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
            <br />
            <Button variant='contained' onClick={(e) => addDiscussionSubmit(e)}>
              Submit
            </Button>
          </FormControl>
        </CardContent>
      </Card>
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
};
// const RegisterFormStyle = styled.div`
//   ${
//     "" /* background: linear-gradient(135deg, rgb(11,15,67) 5%,rgb(27,100,221) ); */
//   }
//   ${"" /* width: 14px; */}
// ${"" /* height: 24px; */}
// ${
//     "" /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */
//   }
// ${"" /* background-position: 50% 50%; */}
// ${"" /* background-repeat: no-repeat; */}
// padding-left: 2rem;
//   background: transparent
//     linear-gradient(150deg, #025fdb 0%, #025fdb 35%, #0b3668 100%) 0% 0%
//     no-repeat padding-box;
//   box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
//   height: 200px;
//   width: 500px;
//   position: absolute;
//   left: 550px;
//   border-radius: 30px;
//   ${"" /* display: flex; */}
//   flex-direction:row;
//   ${"" /* justify-content: space-between; */}
//   ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
// ${"" /* z-index: 10; */} /* Third Nav */
// /* justify-content: flex-start; */
// `;

export default AddDiscussion;
