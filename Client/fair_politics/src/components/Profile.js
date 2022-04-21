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
import { useStateIfMounted } from "use-state-if-mounted";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTabs, StyledTab } from "./CustomStyledTabs";

import AddPost from "./AddPost";
import AddPoll from "./AddPoll";

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

  const [value, setValue] = useStateIfMounted("1");
  const [snack, setSnack] = useStateIfMounted(false);
  const [dialog, setDialog] = useStateIfMounted(false);
  const [dialogContent, setDialogContent] = useStateIfMounted("");

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setInFriend(false);

    const fetchSelfPolls = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/get_polls/${user_details.user_id}`
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
        `http://localhost:4000/api/get_Posts/${user_details.user_id}`
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
  }, []);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header title='Profile Page' />
      <div>
        <ProfileHeader />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <AppBar
              position='fixed'
              sx={{ top: "auto", bottom: 0, backgroundColor: "whitesmoke" }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  boxShadow: 4,
                }}>
                <StyledTabs
                  value={value}
                  textColor='primary'
                  variant='fullWidth'
                  onChange={handleChange}
                  sx={{}}>
                  <StyledTab label='My Posts' value='1' />
                  <StyledTab label='My Polls' value='2' />
                </StyledTabs>
              </Box>
            </AppBar>
            <TabPanel value='1'>
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
                    onClick={() => {
                      setDialogContent("Add New Content");
                      setDialog(true);
                    }}>
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
                      />
                    );
                  })}
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
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
                    onClick={() => {
                      setDialogContent("Add New Content");
                      setDialog(true);
                    }}>
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
                      />
                    );
                  })}
                </Grid>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          // aria-labelledby='alert-dialog-title'
          // aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {value === "1" ? "Add New Post" : "Add New Poll"}
          </DialogTitle>
          {dialogContent === "Add New Content" && (
            <>
              <DialogContent>
                {value === "1" ? (
                  <AddPost setDialog={setDialog} />
                ) : (
                  <AddPoll setDialog={setDialog} />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
      <Backdrop
        sx={{ color: "#fff" }}
        open={loading}
        onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {/* <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={() => setSnack(false)}>
        <Alert
          onClose={() => setSnack(false)}
          severity='success'
          sx={{ width: "100%" }}>
          Item deleted successfully !
        </Alert>
      </Snackbar> */}
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

export default Profile;
