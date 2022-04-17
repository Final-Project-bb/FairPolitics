import React, { useContext, useEffect, useState } from "react";
// import { NavLink as Link } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import ProfileShowDetails from "./ProfileShowDetails";
import PostCard from "./PostCard";
import PollCard from "./PollCard";
import styled from "styled-components";
import { AppContext } from "./Context";
import Loading from "./Loading";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

import { useHistory } from "react-router-dom";

const Profile = () => {
  const {
    user_details,
    loading,
    setLoading,
    profilePostCards,
    setProfilePostCards,
    profilePollCards,
    setProfilePollCards,
    setInFriend,
    inFriend,
  } = useContext(AppContext);

  const [value, setValue] = useState("1");
  const [snack, setSnack] = useState(false);

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setInFriend(false);

    const ac = new AbortController();

    const fetchSelfPolls = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/get_polls/${user_details.user_id}`,
        {
          signal: ac.signal,
        }
      );
      const data = await response.json();
      console.log(data.allPollsWithAnswer);
      console.log("fetchSelfPolls");

      if (data !== undefined) {
        await setProfilePollCards(data.allPollsWithAnswer);
      }
      setLoading(false);
    };

    const fetchSelfPosts = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/get_Posts/${user_details.user_id}`,
        {
          signal: ac.signal,
        }
      );
      const data = await response.json();
      console.log(data.allPostsWithComments);
      console.log("fetchSelfPosts");

      if (data !== undefined) {
        await setProfilePostCards(data.allPostsWithComments);
      }
      setLoading(false);
    };

    fetchSelfPosts();
    console.log("Profile effected");
    fetchSelfPolls();
    return () => ac.abort();
  }, []);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header title='Profile Page' />
      {!loading ? (
        <div>
          <ProfileHeader />
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <AppBar position='fixed' sx={{ top: "auto", bottom: 0, backgroundColor: "whitesmoke"  }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    boxShadow: 4,
                  }}>
                  <TabList
                    textColor='primary'
                    variant='fullWidth'
                    onChange={handleChange}
                    sx={{ }}>
                    <Tab label='My Posts' value='1' />
                    <Tab label='My Polls' value='2' />
                  </TabList>
                </Box>
              </AppBar>
              <TabPanel value='1' >
                {/* <div style={styles.title}>Posts Feed:</div> */}
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container direction='row' alignItems='center'>
                    <Button
                      sx={[
                        {
                          "&:hover": {
                            color: "#2196f3",
                            backgroundColor: "white",
                            boxShadow: 3,
                          },
                          marginBottom: 5,
                        },
                      ]}
                      onClick={() => history.push("/profile/addPost")}>
                      <Grid item>
                        <AddIcon
                          fontSize='large'
                          // to='/profile/addPoll'
                        />
                      </Grid>
                      <Grid item>Add New Post</Grid>
                    </Button>
                  </Grid>
                  <Grid container spacing={0}>
                    {profilePostCards.map((item) => {
                      return (
                        <PostCard
                          key={item.post_id}
                          item={item}
                          inProfile={true}
                          setSnack={setSnack}
                          setProfilePostCards={setProfilePostCards}
                        />
                      );
                    })}
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value='2' >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container direction='row' alignItems='center'>
                    <Button
                      sx={[
                        {
                          "&:hover": {
                            color: "#2196f3",
                            backgroundColor: "white",
                            boxShadow: 3,
                          },
                          marginBottom: 5,
                        },
                      ]}
                      onClick={() => history.push("/profile/addPoll")}>
                      <Grid item>
                        <AddIcon fontSize='large' />
                      </Grid>
                      <Grid item>Add New Poll</Grid>
                    </Button>
                  </Grid>
                  <Grid container spacing={0}>
                    {profilePollCards.map((item) => {
                      return (
                        <PollCard
                          key={item.poll_id}
                          item={item}
                          inProfile={true}
                          setSnack={setSnack}
                          setProfilePollCards={setProfilePollCards}
                        />
                      );
                    })}
                  </Grid>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
          <div style={styles.profileHead}></div>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff" }}
          open={loading}
          // onClick={() => setLoading(false)}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={() => setSnack(false)}>
        <Alert
          onClose={() => setSnack(false)}
          severity='success'
          sx={{ width: "100%" }}>
          Item deleted successfully !
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  order: {
    flexDirection: "row",
  },
  card: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
  },
  head: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "whitesmoke",

    // color:"yellow",
    //       flex: 1,

    //       padding: 24,
    //       backgroundColor: "#eaeaea"
  },
  title: {
    display: "flex",
    // justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    // top: 100,
    // right:150
  },
  profileHead: {
    display: "flex",
    position: "relative",
    top: 10,
    justifyContent: "space-around",
    flexDirection: "column",
    margin: 50,
  },
  addDisButton: {
    display: "flex",
    position: "absolute",
    top: 110,
    left: 180,
    fontSize: 20,
    textDecoration: "none",
    color: "red",
    fontWeight: "bold",
  },
  addFeedButton: {
    display: "flex",
    position: "absolute",
    top: 110,
    left: 350,
    fontSize: 20,
    textDecoration: "none",
    color: "red",
    fontWeight: "bold",
    // justifyContent: 'space-around',
  },
  profileBody: {
    // top:0,
    // // margin:100,
  },
};
const NavLinkAbout = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-100px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: green;
  }
  &.active {
    color: #15cdfc;
  }
`;
const NavLinkDis = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 140px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-100px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: green;
  }
  &.active {
    color: #15cdfc;
  }
`;
const NavLinkFeed = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 270px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-100px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: green;
  }
  &.active {
    color: #15cdfc;
  }
`;
export default Profile;
