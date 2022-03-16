import "./App.css";
import React, { useState } from "react";
import InitialPage from "./components/InitialPage";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Following from "./components/Following";
import Follower from "./components/Follower";
import Profile from "./components/Profile";
import AddDiscussion from "./components/AddDiscussion";
import AddFeedback from "./components/AddFeedback";
import AboutMe from "./components/AboutMe";
import { AppContext } from "./components/Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import EditDiscussionCard from "./components/EditDiscussionCard";
import EditFeedbackCard from "./components/EditFeedbackCard";
function App() {
  const [user_details, setUserDetails] = useState({});
  const [friend_details, setFriendDetails] = useState({});
  const [is_connected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discussionCards, setDiscussionCards] = useState([]);
  const [feedbackCards, setFeedbackCards] = useState([]);
  const [profileDiscussionCards, setProfileDiscussionCards] = useState([]);
  const [profileFeedbackCards, setProfileFeedbackCards] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followingDetails, setFollowingDetails] = useState([]);
  const [followerDetails, setFollowerDetails] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    title: "",
    description: "",
    tag: "",
    picture: "",
  });

  return (
    <AppContext.Provider
      value={{
        user_details,
        setUserDetails,
        friend_details,
        setFriendDetails,
        is_connected,
        setIsConnected,
        loading,
        setLoading,
        discussionCards,
        setDiscussionCards,
        feedbackCards,
        setFeedbackCards,
        profileDiscussionCards,
        setProfileDiscussionCards,
        profileFeedbackCards,
        setProfileFeedbackCards,
        followings,
        setFollowings,
        followers,
        setFollowers,
        followingDetails,
        setFollowingDetails,
        followerDetails,
        setFollowerDetails,
        usersSearch,
        setUsersSearch,
        currentItem,
        setCurrentItem,
      }}>
      <Router >
        <Switch>
          <Route exact path='/'>
            <InitialPage />
          </Route >
          <Route exact path='/connection/login'>
            <Login />
          </Route>
          <Route exact path='/connection/register'>
            <Register />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/contact-us'>
            <ContactUs />
          </Route>
          {is_connected && (
            <div >
              <Route exact path='/home'>
                <Home />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Route exact path='/profile/aboutProfile'>
                <AboutMe />
              </Route>
              <Route exact path='/profile/addDiscussion'>
                <AddDiscussion />
              </Route>
              <Route exact path='/profile/addFeedback'>
                <AddFeedback />
              </Route>
              <Route exact path='/profile/editDiscussion'>
                <EditDiscussionCard />
              </Route>
              <Route exact path='/profile/editFeedback'>
                <EditFeedbackCard />
              </Route>
              <Route exact path='/profile/following'>
                <Following />
              </Route>
              <Route exact path='/profile/follower'>
                <Follower />
              </Route>
              <Route exact path='/search'>
                <Search />
              </Route>
            </div>
          )}
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
