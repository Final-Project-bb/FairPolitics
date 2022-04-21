import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./Context";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  Avatar,
  Box,
  IconButton,
  Typography,
  CardActions,
} from "@mui/material";
import { useStateIfMounted } from "use-state-if-mounted";

const UserCard = ({ user_info, inFollowing, inSearch }) => {
  const {
    setFollowerDetails,
    setFollowingDetails,
    setFollowers,
    setFollowings,
    user_details,
    loading,
    setLoading,
    followings,
    setInFriend,
    followers,
    friend_details,
    setFriendDetails,
  } = useContext(AppContext);
  const history = useHistory();

  const [picturePress, setPicturePress] = useStateIfMounted(false);
  const [isFollow, setIsFollow] = useStateIfMounted(false);
  const [flag, setFlag] = useStateIfMounted(true);
  // const flag= true;
  let followState = false;
  useEffect(() => {
    fetchFollow();
    const checkFollow = () => {
      followState = followings.some(
        (user) => user.user_id == user_info.user_id
      );
      console.log(followState);
      setIsFollow(followState);
      if (followings.length === 0) {
        setIsFollow(false);
        if (inFollowing) {
          setFlag(false);
        }
      } else {
        if (inFollowing) {
          if (followState) {
            setFlag(true);
          } else {
            setFlag(false);
          }
        }
      }
    };
    checkFollow();
    return () => {};
  }, []);

  // here should add and remove follow from db.
  const followUser = (e) => {
    // e.preventDefault();
    setLoading(true);

    if (isFollow) {
      // remove follow from db and update the usestate
      removeFollowDb();
    } else {
      // add follow to db and update the usestate
      addFollowDb();
    }

    setIsFollow(!isFollow);
    setLoading(false);

    //here should be following
  };

  const fetchFollow = async () => {
    const response = await fetch(
      `http://localhost:4000/api/get_follow/${user_details.user_id}`
    );
    const data = await response.json();
    // console.log(data);
    await setFollowings(data.following);
    await setFollowers(data.follower);
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
      await setFollowingDetails(data.result);
      // console.log(data.result);
    } else {
      await setFollowerDetails(data.result);
      // console.log(data.result);
    }
  };
  const addFollowDb = async () => {
    const ids = {
      user_id: user_details.user_id,
      user_following_id: user_info.user_id,
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
      user_following_id: user_info.user_id,
    };
    const response = await fetch("http://localhost:4000/api/remove_following", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    console.log(data);
  };
  const navigateToUserInfoProfile = () => {
    setFriendDetails(user_info);
    console.log(user_info);
    setInFriend(true);
    history.push("/FriendProfile");
  };
  return (
    <div>
      {flag && (
        <Card raised sx={styles.card}>
          {/* <CardContent style={styles.content}> */}
          {/* <div style={styles.semiDetails}> */}
          <CardContent sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                position: "absolute",
              }}>
              <IconButton sx={{}}>
                <Avatar
                  src={require("../images/profilePicExmple.jpg")}
                  onClick={() => navigateToUserInfoProfile()}
                  alt='logo'
                  sx={{
                    // borderRadius: !picturePress ? 350 : 0,
                    // position: !picturePress ? "relative" : "absolute",
                    // left: 20,
                    height: 80,
                    width: 80,
                  }}
                  onClickCapture={() => {
                    setPicturePress(!picturePress);
                  }}
                />
              </IconButton>
            </Typography>
            <Typography
              variant='h5'
              sx={{
                display: "flex",
                mx: "auto",
              }}>
              {user_info.first_name} {user_info.last_name}
            </Typography>
          </CardContent>

          <CardContent sx={styles.content}>
            {user_info.gender} , {user_info.birthdate}
          </CardContent>
          <CardContent sx={styles.content}>
            Working in: {user_info.job_title} living in {user_info.city}
          </CardContent>
          <CardContent sx={styles.content}>
            {user_info.semi_description}
          </CardContent>
          <div style={styles.profileHead}></div>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant={isFollow ? "contained" : "outlined"}
              sx={styles.follow}
              onClick={(e) => followUser(e)}>
              {isFollow ? "unfollow" : "follow"}!
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};
UserCard.defaultProps = {
  inFollowing: false,
  inSearch: false,
};
const styles = {
  card: {
    // height: 600,
    width: 600,
    // top: 50,
    // left: "30%",
    // position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: "space-around",
    marginBottom: 3,
    marginLeft: 3,
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  name: {
    // display: "flex",
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    position: "relative",
    // marginLeft:10,
    fontSize: 25,
    top: -100,
    // left: -10,
  },
  all: {
    // // display: "flex",
    // position: "relative",
    // top: 50,
    // left: 125,
  },
  profileHead: {
    // display: "flex",
    // justifyContent: "space-around",
    // flexDirection: "column",
    // position: "relative",
    // left: -150,
    // top: -40,
  },
  semiDetails: {
    // display: "flex",
    // // justifyContent: "space-around",
    // flexDirection: "column",
    // position: "absolute",
    // left: -50,
    // height: 20,
    // // margin: -15,
    // fontSize: 15,
    // top: 10,
  },
  follow: {
    // backgroundColor: "steelblue",
    position: "relative",
    // top: -100,
  },
};

export default UserCard;
