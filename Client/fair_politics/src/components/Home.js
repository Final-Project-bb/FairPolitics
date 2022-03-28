import React, { useEffect, useContext } from "react";
import Header from "./Header";
import DiscussionCard from "./DiscussionCard";
import FeedbackCard from "./FeedbackCard";
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
import CircularProgress from "@mui/material/CircularProgress";

import { useHistory } from "react-router-dom";
import { Backdrop } from "@mui/material";

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

  const [value, setValue] = React.useState("1");

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchDiscussions = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/discussion_feed/${user_details.user_id}`
    );
    const data = await response.json();
    console.log("fetchDiscussions");
    console.log(data.allPostsWithComments);

    if (data != undefined) {
      await setPostCards(data.allPostsWithComments);
    }
    setLoading(false);
  };

  const fetchPolls = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/poll_feed/${user_details.user_id}`
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
    fetchDiscussions();
    console.log("Home effected");
    fetchPolls();
  }, []);

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Home Page' />
      {!loading ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant='fullWidth'
                onChange={handleChange}
                aria-label='lab API tabs example'>
                <Tab label='Posts Feed' value='1' />
                <Tab label='Polls Feed' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              {/* <div style={styles.title}>Posts Feed:</div> */}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container direction='row' alignItems='center'>
                  <IconButton
                    sx={[{ "&:hover": { color: "#2196f3" }, marginBottom: 5 }]}
                    onClick={() => history.push("/profile/addFeedback")}>
                    <Grid item>
                      <AddIcon
                        fontSize='large'
                        // to='/profile/addFeedback'
                      />
                    </Grid>
                    <Grid item>Add New Post</Grid>
                  </IconButton>
                </Grid>
                <Grid container spacing={0}>
                  {postCards.map((item) => {
                    return <DiscussionCard key={item.post_id} item={item} />;
                  })}
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              {/* <div style={styles.title}>Polls Feed</div> */}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container direction='row' alignItems='center'>
                  <IconButton
                    sx={[{ "&:hover": { color: "#2196f3" }, marginBottom: 5 }]}
                    onClick={() => history.push("/profile/addFeedback")}>
                    <Grid item>
                      <AddIcon fontSize='large' />
                    </Grid>
                    <Grid item>Add New Poll</Grid>
                  </IconButton>
                </Grid>
                <Grid container spacing={0}>
                  {pollCards.map((item) => {
                    return <FeedbackCard key={item.poll_id} item={item} />;
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
