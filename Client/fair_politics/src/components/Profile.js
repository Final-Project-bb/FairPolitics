import React, { useContext } from "react";
import { NavLink as Link } from "react-router-dom";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import ProfileShowDetails from "./ProfileShowDetails";
import DiscussionCard from "./DiscussionCard";
import FeedbackCard from "./FeedbackCard";
import styled from "styled-components";
import { AppContext } from "./Context";

const Profile = () => {
  const {
    user_details,
    setLoading,
    profileFeedbackCards,
    profileDiscussionCards,
    setProfileFeedbackCards,
    setProfileDiscussionCards,
  } = useContext(AppContext);

  // const fetchSelfPolls = async () => {
  //   setLoading(true);
  //   const response = await fetch(`http://localhost:4000/api/get_polls/${user_details.user_id}`);
  //   const data = await response.json();
  //   // console.log(data.result);
  //   console.log("fetchPolls");
  //   console.log(data.result);

  //   if (data !== undefined) {
  //     await setFeedbackCards(data.result[0]);
  //   }
  //   setLoading(false);
  // };


  return (
    <div>
      <Header title='Profile Page' />
      <ProfileHeader />
      <br />
      <br />
      <div style={styles.card}>
        <DiscussionCard DiscussionCards={profileDiscussionCards} />
        <FeedbackCard FeedbackCards={profileFeedbackCards} />
      </div>
    </div>
  );
};

const styles = {
  order: {
    flexDirection: "row",
  },
  card: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  head: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    flexDirection: "row",
    paddingVertical: 8,
    padding: 20,
    textDecoration: "none",
    borderWidth: 4,
    borderColor: "#20232a",
    backgroundColor: "#61dafb",
    color: "#20232a",
    fontSize: 30,
    fontWeight: "bold",
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
