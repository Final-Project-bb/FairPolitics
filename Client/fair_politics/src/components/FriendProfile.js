import React, { useContext, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import ProfileShowDetails from "./ProfileShowDetails";
import DiscussionCard from "./DiscussionCard";
import FeedbackCard from "./FeedbackCard";
import styled from "styled-components";
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

const FriendProfile = () => {
  const [value, setValue] = React.useState("1");

  const history = useHistory();

  const {
    friend_details,
    loading,
    setLoading,
    profileFeedbackCards,
    profileDiscussionCards,
    setProfileFeedbackCards,
    setProfileDiscussionCards,
    inFriend,
  } = useContext(AppContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchSelfPolls = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/get_polls/${friend_details.user_id}`
    );
    const data = await response.json();
    console.log(data.allPollsWithAnswer);
    console.log("fetchSelfPolls");

    if (data !== undefined) {
      await setProfileFeedbackCards(data.allPollsWithAnswer);
    }
    setLoading(false);
  };

  const fetchSelfDiscussions = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/get_discussions/${friend_details.user_id}`
    );
    const data = await response.json();
    console.log(data.allPostsWithComments);
    console.log("fetchSelfDiscussions");

    if (data !== undefined) {
      await setProfileDiscussionCards(data.allPostsWithComments);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSelfDiscussions();
    console.log("Profile effected");
    fetchSelfPolls();
  }, []);

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Home Page' />
      <ProfileHeader />

      {!loading ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant='fullWidth'
                onChange={handleChange}
                aria-label='lab API tabs example'>
                <Tab label={`${friend_details.first_name}'S Posts`} value='1' />
                <Tab label={`${friend_details.first_name}'S Polls`} value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              {/* <div style={styles.title}>Posts Feed:</div> */}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  {profileDiscussionCards.map((item) => {
                    return <DiscussionCard key={item.post_id} item={item} />;
                  })}
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              {/* <div style={styles.title}>Polls Feed</div> */}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  {profileFeedbackCards.map((item) => {
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
    // color:"yellow",
    //       flex: 1,

    //       padding: 24,
    //       backgroundColor: "#eaeaea"
  },
  title: {
    display: "flex",
    justifyContent: "space-around",
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
export default FriendProfile;
