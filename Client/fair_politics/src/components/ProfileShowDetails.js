import React, { useState, useContext } from "react";
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
} from "@mui/material";

const ProfileShowDetails = ({inFriend}) => {
  const [picturePress, setPicturePress] = useState(false);
  const {
    user_details,
    friend_details,
    loading,
    setLoading,
    followings,
    followers,
    setFollowingDetails,
    setFollowerDetails,
  } = useContext(AppContext);
  const history = useHistory();

  const showFollowing = () => {
    setLoading(true);
    let following_ids = followings.map((user) => user.user_following_id);
    fetchUserDetailsById(following_ids, true);
    setLoading(false);
    history.push("/profile/following");
  };
  const showFollower = () => {
    setLoading(true);
    let follower_ids = followers.map((user) => user.user_id);
    fetchUserDetailsById(follower_ids, false);
    setLoading(false);
    history.push("/profile/follower");
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

  // const fetchFollowerDetails = () => {};

  return (
    <div>
      <div style={styles.semiDetails}>
        <div style={styles.name}>   
          {!inFriend?user_details.first_name:friend_details.first_name} {!inFriend?user_details.last_name:friend_details.last_name}
        </div>
        <div>
          {!inFriend?user_details.gender:friend_details.gender} , {!inFriend?user_details.age:friend_details.age}
        </div>
        <div>
          Working it: {!inFriend?user_details.job_title:friend_details.job_title} living in {!inFriend?user_details.city:friend_details.city}
        </div>
        <div>{!inFriend?user_details.semi_description:friend_details.semi_description}</div>
      </div>
      <div style={styles.profileHead}>
        <img
          src={require("../images/profilePicExmple.jpg")}
          alt='logo'
          style={{
            borderRadius: !picturePress ? 350 : 0,
            position: !picturePress ? "relative" : "absolute",
            left: 0,
            height: !picturePress ? 150 : 400,
            width: !picturePress ? 150 : 400,
          }}
          onClickCapture={() => setPicturePress(!picturePress)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 400,
          flex: 1,
          flexDirection: "row",
          justifyContent: 'space-around'
        }}>
        <Button variant='outlined' color='primary' onClick={() => showFollowing()}>
          Following {followings.length}
        </Button>
        <Button variant='outlined' color='primary' onClick={() => showFollower()}>
          Follower {followers.length}
        </Button>
      </div>
      {/* image profile will be here */}
      {/* about and more..  */}
      {/* <button style={styles.info}> more info</button> */}
    </div>
  );
};
ProfileShowDetails.deafult = {
  inFriend: false,
};
const styles = {
  name: {
    display: "flex",
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    position: "absolute",
    // marginLeft:10,
    fontSize: 25,
    top: -30,
    left: -10,
  },
  profileHead: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "absolute",
    left: -50,
    top: -70,
  },
  semiDetails: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "absolute",
    left: 150,
    margin: 0,
    top: -25,
    // backgroundColor: 'whitesmoke'
  },
};


export default ProfileShowDetails;
