import React, { useEffect, useContext, useState } from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import PollCard from "./PollCard";
import { AppContext } from "./Context";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Loading from "./Loading";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { AppBar } from "@mui/material";
import { Tabs } from "@mui/material";
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AddPost from "./AddPost";
import AddPoll from "./AddPoll";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useStateIfMounted } from "use-state-if-mounted";

import { StyledTabs, StyledTab } from "./CustomStyledTabs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Home = () => {
  const {
    user_details,
    loading,
    setLoading,
    pollCards,
    setPollCards,
    postCards,
    setPostCards,
    inFriend,
    setInFriend,
    setUserDetails,
    setIsConnected,
  } = useContext(AppContext);

  const [value, setValue] = useStateIfMounted("1");
  const [dialog, setDialog] = useStateIfMounted(false);
  const [dialogContent, setDialogContent] = useStateIfMounted("");
  const [alert, setAlert] = useStateIfMounted(false);
  const [alertContent, setAlertContent] = useStateIfMounted("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const user = JSON.parse(window.localStorage.getItem("user"));

    const response = await fetch(
      `http://localhost:4000/api/Post_feed/${user.user_id}`
    );
    const data = await response.json();
    console.log("fetchPosts");
    console.log(data.allPostsWithComments);

    if (data != undefined) {
      await setPostCards(data.allPostsWithComments);
    }
    setLoading(false);
  };

  const fetchPolls = async () => {
    setLoading(true);
    const user = JSON.parse(window.localStorage.getItem("user"));

    const response = await fetch(
      `http://localhost:4000/api/poll_feed/${user.user_id}`
    );
    const data = await response.json();
    console.log(data.allPollsWithAnswer);
    console.log("fetchPolls");
    // console.log(data.allPollsWithAnswer);

    if (data !== undefined) {
      await setPollCards(data.allPollsWithAnswer);
    }
    setLoading(false);
  };

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const isconnected = window.localStorage.getItem("isconnected");
    setUserDetails(JSON.parse(user));
    setIsConnected(isconnected);
    console.log("Home effected");
    console.log(user_details);
    fetchPosts();
    fetchPolls();
  }, []);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header title='Home Page' />
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <AppBar
              position='fixed'
              sx={{ top: "auto", bottom: 0, backgroundColor: "whitesmoke" }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  boxShadow: 3,
                }}>
                <StyledTabs
                  value={value}
                  variant='fullWidth'
                  onChange={handleChange}>
                  <StyledTab label='Posts Feed' value='1' />
                  <StyledTab label='Polls Feed' value='2' />
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
                <Grid container direction='column' spacing={0}>
                  {postCards.map((item) => {
                    return (
                      // <Grid item >
                      <PostCard key={item.post_id} item={item} />
                      // </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              {/* <div style={styles.title}>Polls Feed</div> */}
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
                  {pollCards.map((item) => {
                    return (
                      <PollCard
                        key={item.poll_id}
                        item={item}
                        fetchPolls={fetchPolls}
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
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            {value === "1" ? "Add New Post" : "Add New Poll"}
          </DialogTitle>
          {dialogContent === "Add New Content" && (
            <>
              <DialogContent>
                {value === "1" ? (
                  <AddPost
                    setDialog={setDialog}
                    setAlert={setAlert}
                    setAlertContent={setAlertContent}
                  />
                ) : (
                  <AddPoll
                    setDialog={setDialog}
                    setAlert={setAlert}
                    setAlertContent={setAlertContent}
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={() => setAlert(false)}>
          <Alert
            onClose={() => setAlert(false)}
            severity='success'
            sx={{ width: "100%" }}>
            {alertContent}
          </Alert>
        </Snackbar>
      </div>
      <Backdrop
        sx={{ color: "#fff" }}
        open={loading}
        onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

const styles = {
  head: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "whitesmoke",
  },
  card: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    // justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    marginBottom: 50,
    // top: 100,
    // right:150
  },
};

export default Home;
