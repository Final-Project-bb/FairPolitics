import React, { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";
import ProfileHeader from "./ProfileHeader";
import Grid from "@mui/material/Grid";

const Following = () => {
  const { loading, setLoading, friendFollowings, followings, inFriend } =
    useContext(AppContext);
  // console.log("followingDetails");
  // console.log(followingDetails);
  return (
    <div>
      <Header title='Following' />
      <ProfileHeader />
      <br />
      <Grid container spacing={0}>
        {!inFriend
          ? followings.map((user) => (
              <UserCard
                key={user.user_id}
                user_info={user}
                inFollowing={true}
              />
            ))
          : friendFollowings.map((user) => (
              <UserCard key={user.user_id} user_info={user} />
            ))}
      </Grid>
    </div>
  );
};

export default Following;
