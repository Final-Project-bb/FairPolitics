import React, { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";
import ProfileHeader from "./ProfileHeader";

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
      {!inFriend
        ? followings.map((user) => (
            <UserCard key={user.user_id} user_info={user} inFollowing={true} />
          ))
        : friendFollowings.map((user) => (
            <UserCard key={user.user_id} user_info={user} />
          ))}
    </div>
  );
};

export default Following;
