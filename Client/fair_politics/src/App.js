import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Following from "./components/Following";
import Follower from "./components/Follower";
import Profile from "./components/Profile";
import AddPost from "./components/AddPost";
import AddPoll from "./components/AddPoll";
import AboutMe from "./components/AboutMe";
import FriendProfile from "./components/FriendProfile";
import { AppContext } from "./components/Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import EditPostCard from "./components/EditPostCard";
import EditPollCard from "./components/EditPollCard";
import Algorithms from "./components/Algorithms";
import Header from "./components/Header";

function App() {
  
  const [user_details, setUserDetails] = useState({});
  const [algo_id, setAlgoId] = useState();
  const [friend_details, setFriendDetails] = useState({});
  const [is_connected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postCards, setPostCards] = useState([]);
  const [pollCards, setPollCards] = useState([]);
  const [profilePostCards, setProfilePostCards] = useState([]);
  const [profilePollCards, setProfilePollCards] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [friendFollowings, setFriendFollowings] = useState([]);
  const [friendFollowers, setFriendFollowers] = useState([]);
  const [inFriend, setInFriend] = useState(false);
  const [usersSearch, setUsersSearch] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    title: "",
    description: "",
    tag: "",
    picture: "",
  });

  // useEffect(() => {
  //   const user = window.localStorage.getItem("user");
  //   const isconnected = window.localStorage.getItem("isconnected");
  //   setUserDetails(JSON.parse(user));
  //   setIsConnected(isconnected);
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("user", JSON.stringify(user_details));
  // });

  return (
    <AppContext.Provider
      value={{
        user_details,
        setUserDetails,
        algo_id,
        setAlgoId,
        friend_details,
        setFriendDetails,
        is_connected,
        setIsConnected,
        loading,
        setLoading,
        postCards,
        setPostCards,
        pollCards,
        setPollCards,
        profilePostCards,
        setProfilePostCards,
        profilePollCards,
        setProfilePollCards,
        followings,
        setFollowings,
        followers,
        setFollowers,
        inFriend,
        setInFriend,
        friendFollowings,
        setFriendFollowings,
        friendFollowers,
        setFriendFollowers,
        usersSearch,
        setUsersSearch,
        currentItem,
        setCurrentItem,
      }}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/connection/login'>
            <Login />
          </Route>
          <Route exact path='/connection/register'>
            <Register />
          </Route>
          <Route exact path='/About'>
            <About />
          </Route>
          <Route exact path='/Contact-Us'>
            <ContactUs />
          </Route>
          {/* {is_connected && ( */}
          <>
            <Route exact path='/Home'>
              <Home />
            </Route>
            <Route exact path='/Profile'>
              <Profile />
            </Route>
            <Route exact path='/profile/aboutProfile'>
              <AboutMe />
            </Route>
            {/* <Route exact path='/profile/addPost'>
              <AddPost />
            </Route>
            <Route exact path='/profile/addPoll'>
              <AddPoll />
            </Route>
            <Route exact path='/profile/editPost'>
              <EditPostCard />
            </Route>
            <Route exact path='/profile/editPoll'>
              <EditPollCard />
            </Route> */}
            <Route exact path='/profile/following'>
              <Following />
            </Route>
            <Route exact path='/profile/follower'>
              <Follower />
            </Route>
            <Route exact path='/search'>
              <Search />
            </Route>
            <Route exact path='/FriendProfile'>
              <FriendProfile />
            </Route>
            <Route exact path='/Algorithms'>
              <Algorithms />
            </Route>
          </>
          {/* )} */}
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
