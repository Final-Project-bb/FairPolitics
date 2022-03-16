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
} from "@mui/material";

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
    followers,
  } = useContext(AppContext);
  const history = useHistory();

  const [picturePress, setPicturePress] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [flag, setFlag] = useState(true);
  // const flag= true;
  let followState = false;
  useEffect(() => {
    fetchFollow();
    // let following_ids = followings.map((user) => user.user_following_id);
    // fetchUserDetailsById(following_ids, true)
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
      // setIsFollow(!isFollow);
    }
    if (inFollowing) {
      history.push("/profile/follower");
      history.push("/profile/following");
    } else {
      if (inSearch) {
        history.push("/profile/following");
        history.push("/search");
      } else {
        history.push("/profile/following");
        history.push("/profile/follower");
      }
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
  return (
    <div>
      {flag && (
        <Card style={styles.card}>
          <CardContent style={styles.content}>
            <Avatar
              src={require("../images/profilePicExmple.jpg")}
              alt='logo'
              style={{
                borderRadius: !picturePress ? 350 : 0,
                position: !picturePress ? "relative" : "absolute",
                // left: 20,
                height: !picturePress ? 80 : 200,
                width: !picturePress ? 80 : 200,
              }}
              onClickCapture={() => {
                setPicturePress(!picturePress);
              }}
            />
            {/* <div style={styles.semiDetails}> */}
            <CardContent style={styles.name}>
              {user_info.first_name} {user_info.last_name}
            </CardContent>
            <div style={{ position: "relative", top: -100 }}>
              {user_info.gender} , {user_info.age}
            </div>
            <div style={{ position: "relative", top: -100 }}>
              Working in: {user_info.job_title} living in {user_info.city}
            </div>
            <div style={{ position: "relative", top: -100 }}>
              {user_info.semi_description}
            </div>
            <div style={styles.profileHead}></div>
            <br />
            <Button
              variant='contained'
              style={styles.follow}
              onClick={(e) => followUser(e)}>
              {isFollow ? "unfollow" : "follow"}!
            </Button>
          </CardContent>
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
    height: 200,
    width: 600,
    top: 50,
    // left: "30%",
    position: "relative",
    // alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
    marginBottom: 30,
    marginLeft: 30,
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
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
    backgroundColor: "steelblue",
    position: "relative",
    top: -100,
  },
};

export default UserCard;
