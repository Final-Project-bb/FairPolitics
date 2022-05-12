import React, { useContext, useEffect } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";
import ProfileHeader from "./ProfileHeader";
import Grid from "@mui/material/Grid";

const Follower = () => {
  const {
    loading,
    setLoading,
    followers,
    inFriend,
    friendFollowers,
    setUserDetails,
    setIsConnected,
  } = useContext(AppContext);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const isconnected = window.localStorage.getItem("isconnected");
    setUserDetails(JSON.parse(user));
    setIsConnected(isconnected);
  }, []);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header title='Follower' />
      <ProfileHeader />
      <br />
      <Grid container spacing={0}>
        {!inFriend
          ? followers.map((user) => (
              <UserCard key={user.user_id} user_info={user} />
            ))
          : friendFollowers.map((user) => (
              <UserCard key={user.user_id} user_info={user} />
            ))}
      </Grid>
    </div>
  );
};

export default Follower;
