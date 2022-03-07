import "./App.css";
import React, { useState } from "react";
import InitialPage from "./components/InitialPage";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddDiscussion from "./components/AddDiscussion";
import AddFeedback from "./components/AddFeedback";
import AboutMe from "./components/AboutMe";
import { AppContext } from "./components/Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
function App() {
  const [user_details, setUserDetails] = useState({});
  const [is_connected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discussionCards, setDiscussionCards] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user_details,
        setUserDetails,
        is_connected,
        setIsConnected,
        loading,
        setLoading,
        discussionCards,
        setDiscussionCards,
      }}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <InitialPage />
          </Route>
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
            <div>
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
