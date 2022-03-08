import React, { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./Context";
import UserCard from "./UserCard";

const Following = () => {
  const { loading, setLoading, followingDetails } = useContext(AppContext);

  return (
    <div>
      <Header title='Following' />
      Following
      {followingDetails.map(user => <UserCard key={user.user_id} user_info={user}/>)}
    </div>
  );
};

export default Following;
