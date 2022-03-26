import React, { useContext } from "react";
import Header from "./Header";
import Loading from "./Loading";
import { AppContext } from "./Context";

import UserCard from "./UserCard";
const Search = () => {
  const {
    loading,
    setLoading,
    usersSearch,
    setUserDetails,
    is_connected,
    setIsConnected,
  } = useContext(AppContext);

  const users = [
    {
      user_id: "1",
      first_name: "Israel",
      last_name: "Israeli",
      city: "Ramat gan",
      birthdate: "26/04/1995",
      job_title: "Computer Science student",
      description: "king",
      semi_description: "semi_description",
      profile_picture: "../images/profilePicExmple.jpg",
      gender: "male",
      age: 26,
      is_public_elected: false,
    },
    {
      user_id: "2",
      first_name: "shlomo",
      last_name: "king",
      city: "Jerusalem",
      birthdate: "26/04/1995",
      job_title: "Computer Science student",
      description: "king",
      semi_description: "semi_description",
      profile_picture: "../images/profilePicExmple.jpg",
      gender: "male",
      age: 26,
      is_public_elected: true,
    },
  ];
  return (
    <div>
      <Header title='Search Page' />
      <div style={styles.text}>
        {!loading ? (
          <>
            {usersSearch.map((user) => (
              <div>
                <UserCard key={user.user_id} user_info={user} inSearch={true} />
              </div>
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

const styles = {
  head: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    // top: 10,
    // right:150
  },
  text: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: 0,
    // fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    position: "relative",
    // marginLeft:10,
    top: 15,
    right: 20,
  },
  likes: {
    position: "relative",
    right: 105,
  },
  comment: {
    position: "relative",
    top: 20,
    // right:105,
  },
};

export default Search;
