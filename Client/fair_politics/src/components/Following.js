import React, { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";
import ProfileHeader from "./ProfileHeader";


const Following = () => {
  const { loading, setLoading, followingDetails,followings } = useContext(AppContext);
// console.log("followingDetails");
// console.log(followingDetails);
  return (
    <div>
      <Header title='Following' />
      <ProfileHeader/>
      <br/>
      {followings.map(user =>
        <UserCard key={user.user_id} user_info={user} inFollowing={true}/>
      )}
    </div>
  );
};

export default Following;
