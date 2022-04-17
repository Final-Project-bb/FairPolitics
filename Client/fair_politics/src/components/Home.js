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
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
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
  } = useContext(AppContext);

  const [value, setValue] = useState("1");

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const ac = new AbortController();
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/Post_feed/${user_details.user_id}`,
        { signal: ac.signal }
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
      const response = await fetch(
        `http://localhost:4000/api/poll_feed/${user_details.user_id}`,
        {
          signal: ac.signal,
        }
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
    fetchPosts();
    console.log("Home effected");
    fetchPolls();

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header title='Home Page' />
      {!loading ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <AppBar position='fixed' sx={{ top: "auto", bottom: 0, backgroundColor: "whitesmoke" }}>
              <Box
                sx={{
                  borderBottom: 1 ,
                  borderColor: "divider",
                  boxShadow: 3,
                }}>
                <TabList
                  variant='fullWidth'
                  color='secondary'
                  onChange={handleChange}
                  sx={{  }}
                  >
                  <Tab label='Posts Feed' value='1'  />
                  <Tab label='Polls Feed' value='2' />
                </TabList>
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
                    onClick={() => history.push("/profile/addPoll")}>
                    <Grid item>
                      <AddIcon fontSize='large' />
                    </Grid>
                    <Grid item>Add New Poll</Grid>
                  </Button>
                </Grid>
                <Grid container spacing={0}>
                  {pollCards.map((item) => {
                    return <PollCard key={item.poll_id} item={item} />;
                  })}
                </Grid>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      ) : (
        <>
          <Backdrop
            sx={{ color: "#fff" }}
            open={loading}
            onClick={() => setLoading(false)}>
            <CircularProgress color='inherit' />
          </Backdrop>
        </>
      )}
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
