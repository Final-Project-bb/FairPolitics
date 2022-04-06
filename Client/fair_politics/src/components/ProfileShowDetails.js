import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  Avatar,
  ButtonGroup,
  Link,
  Box,
} from "@mui/material";

const ProfileShowDetails = () => {
  const [picturePress, setPicturePress] = useState(false);
  const {
    user_details,
    friend_details,
    loading,
    setLoading,
    followings,
    followers,
    inFriend,
    setFollowings,
    setInFriend,
    friendFollowings,
    setFriendFollowings,
    friendFollowers,
    setFriendFollowers,
    setFollowingDetails,
    setFollowerDetails,
  } = useContext(AppContext);
  const history = useHistory();

  const fetchFollow = async () => {
    const response = await fetch(
      `http://localhost:4000/api/get_follow/${friend_details.user_id}`
    );
    const data = await response.json();
    console.log(data);
    setFriendFollowings(data.following);
    setFriendFollowers(data.follower);
  };

  const showFollowing = () => {
    setLoading(true);
    setLoading(false);
    history.push("/profile/following");
  };

  const showFollower = () => {
    setLoading(true);
    console.log("inFriend");
    console.log(inFriend);
    if (inFriend) {
    }

    setLoading(false);
    history.push("/profile/follower");
  };

  const updateFollow = (e) => {
    setLoading(true);
    followings.filter((user) => user.user_id === friend_details.user_id)
      .length > 0
      ? removeFollowDb()
      : addFollowDb();

    followings.filter((user) => user.user_id === friend_details.user_id)
      .length > 0
      ? setFollowings(
          followings.filter((user) => user.user_id !== friend_details.user_id)
        )
      : setFollowings([...followings, friend_details]);
    setLoading(false);
  };

  const addFollowDb = async () => {
    const ids = {
      user_id: user_details.user_id,
      user_following_id: friend_details.user_id,
    };
    const response = await fetch("http://localhost:4000/api/add_following", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    console.log(data);
  };

  const removeFollowDb = async () => {
    const ids = {
      user_id: user_details.user_id,
      user_following_id: friend_details.user_id,
    };
    const response = await fetch("http://localhost:4000/api/remove_following", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchUserDetailsById = async (ids, isFollowing) => {
    if (ids.length === 0) {
      return;
    }
    const response = await fetch("http://localhost:4000/api/get_users_by_ids", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    if (isFollowing) {
      setFollowingDetails(data.result);
      // console.log(data.result);
    } else {
      setFollowerDetails(data.result);
      //      console.log(data.result);
    }
  };

  useEffect(() => {
    {
      inFriend && fetchFollow();
    }
    return () => {};

  }, [inFriend]);

  return (
    <Box sx={styles.container}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 10,
          marginRight: 20,
          justifyContent: "center",
          textAlign: "center",
        }}>
        
        <Avatar
          src={`${JSON.stringify(user_details.profile_picture)}`}
          // alt='Remy Sharp'
          style={{
            borderRadius: !picturePress ? 350 : 0,
            // position: !picturePress ? "relative" : "absolute",
            height: !picturePress ? 150 : 400,
            width: !picturePress ? 150 : 400,
            // marginRight: 20,
            // marginLeft: 20,
            marginBottom: 10,
          }}
          onClickCapture={() => setPicturePress(!picturePress)}
        />
        <Button
          color='primary'
          onClick={() => {
            history.push("/profile/aboutProfile");
          }}>
          About Me
        </Button>
      </Box>
      <div style={styles.semiDetails}>
        <div style={{ fontWeight: "light", fontSize: 17 }}>
          {!inFriend ? user_details.first_name : friend_details.first_name}{" "}
          {!inFriend ? user_details.last_name : friend_details.last_name}
        </div>
        <div style={{ fontWeight: "light", fontSize: 17 }}>
          {!inFriend ? user_details.gender : friend_details.gender} ,{" "}
          {!inFriend ? user_details.age : friend_details.age}
        </div>
        <div style={{ fontWeight: "light", fontSize: 17 }}>
          Working in:{" "}
          {!inFriend ? user_details.job_title : friend_details.job_title}
          Living in {!inFriend ? user_details.city : friend_details.city}
        </div>
        <div style={{ fontWeight: "light", fontSize: 17 }}>
          {!inFriend
            ? user_details.semi_description
            : friend_details.semi_description}
        </div>
      </div>

      <div style={styles.profileHead}>
        <ButtonGroup
          style={{
            position: "absolute",
            left: 400,
            flex: 1,
            top: -50,
            flexDirection: "row",
            justifyContent: "space-around",
          }}>
          {inFriend && (
            <Button
              variant={
                followings.filter(
                  (user) => user.user_id === friend_details.user_id
                ).length > 0
                  ? "contained"
                  : "outlined"
              }
              color='primary'
              onClick={() => updateFollow()}>
              {followings.filter(
                (user) => user.user_id === friend_details.user_id
              ).length > 0
                ? "Unfollow"
                : "Follow"}
            </Button>
          )}
          <Button
            variant='outlined'
            color='primary'
            onClick={() => showFollowing()}>
            Following {!inFriend ? followings.length : friendFollowings.length}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => showFollower()}>
            Follower {!inFriend ? followers.length : friendFollowers.length}
          </Button>
        </ButtonGroup>
        {/* image profile will be here */}
        {/* about and more..  */}
        {/* <button style={styles.info}> more info</button> */}
      </div>
    </Box>
  );
};

// ProfileShowDetails.deafult = {
//   inFriend: false,
// };

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
  // name: {
  //   display: "flex",
  //   // justifyContent: 'space-around',
  //   // flexDirection: 'row',
  //   position: "absolute",
  //   // marginLeft:10,
  //   fontSize: 25,
  //   top: -30,
  //   left: -10,
  // },
  profileHead: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "row",
    position: "relative",
    //   left: -50,
    top: 100,
  },
  semiDetails: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    // position: "absolute",
    // left: 150,
    // margin: 0,
    // top: -25,
    // backgroundColor: 'whitesmoke'
  },
};

export default ProfileShowDetails;
