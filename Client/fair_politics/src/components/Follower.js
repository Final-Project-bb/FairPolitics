import React, { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";
import ProfileHeader from "./ProfileHeader";

const Follower = () => {
  const { loading, setLoading, followers, inFriend, friendFollowers} = useContext(AppContext);

  return (
    <div>
      <Header title='Follower' />
      <ProfileHeader/>
      <br/>
      {!inFriend ? followers.map(user =>
        <UserCard key={user.user_id} user_info={user}/>
       ) : friendFollowers.map(user =>
        <UserCard key={user.user_id} user_info={user}/>
       )
       }
    </div>
  );
};

export default Follower;
