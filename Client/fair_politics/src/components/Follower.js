import React, { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";
import ProfileHeader from "./ProfileHeader";

const Follower = () => {
  const { loading, setLoading, followerDetails } = useContext(AppContext);

  return (
    <div>
      <Header title='Follower' />
      <ProfileHeader/>
      <br/>
      {followerDetails.map(user =>
        <UserCard key={user.user_id} user_info={user}/>
       )}
    </div>
  );
};

export default Follower;
