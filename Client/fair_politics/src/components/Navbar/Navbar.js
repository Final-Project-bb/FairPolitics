import { MenuItems } from "./MenuItems";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import {
  Nav,
  NavLink,
  NavLinkBar,
  NavLinkSearch,
  NavMenuBar,
  Bars,
  Language,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavIconSearch,
} from "./NavbarElements";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context";
const Navbar = () => {
  const [search, setSearch] = useState();
  const [onBar, setOnBar] = useState(false);
  const [navHeight, setNavHeight] = useState("80px");
  const [navDisplay, setNavDisplay] = useState("none");
  const {
    user_details,
    setLoading,
    setUsersSearch,
    setUserDetails,
    is_connected,
    setIsConnected,
    setFollowerDetails, setFollowingDetails, setFollowers, setFollowings,
  } = useContext(AppContext);
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  const loginClick = () => {
    setIsConnected(false);
    setUserDetails({});
    setFollowerDetails([]);
    setFollowingDetails([]);
    setFollowers([]);
    setFollowings([]);
    setLoading(false);
    history.push("/connection/login");
  };
  const onSearch = (e) => {
    e.preventDefault();
    console.log(search);
    if (is_connected) {
      setLoading(true);
      fetchSearchUsers();
      setLoading(false);
      history.push("/search");
    } else {
      alert("you have to sign in first");
    }
  };
  const fetchSearchUsers = async () => {
    const response = await fetch(
      `http://localhost:4000/api/search_by_name/${search}/${user_details.user_id}`
    );
    const data = await response.json();
    console.log(data.result);
    setUsersSearch(data.result);
  };
  const onPressBar = (event) => {
    event.preventDefault();
    setOnBar(!onBar);
    // alert("bar clicked")
  };
  const onLanguagePress = () => {
    alert("Language clicked");
  };
  // let navHeight= "80px"
  useEffect(() => {
    if (onBar) {
      setNavHeight("300px");
      setNavDisplay("flex");
    } else {
      // setNavDisplay("none");
      setNavHeight("80px");
      setNavDisplay("none");
    }
  }, [onBar]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  return (
    <>
      <Nav style={{ height: navHeight }}>
        <img
          src={require("../../images/govLogo.jpg")}
          alt='logo'
          style={{
            borderRadius: 300,
            height: 50,
            position: "absolute",
            left: 5,
          }}
          onClickCapture={handleClick}
        />
        {/* <NavLinkSearch to='/'> */}
        <form onSubmit={onSearch} style={styles.formStyle}>
          <label onClick={onSearch}>Search:</label>
          <input
            onKeyDown={handleKeyDown(onSearch)}
            style={{ height: "30px", width: "200px", borderRadius: 70 }}
            type='text'
            placeholder='search here!'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* <input type="submit" style={{ color: "white", backgroundColor: "black" }} /> */}
        </form>
        {/* </NavLinkSearch> */}

        <Bars onClickCapture={onPressBar} />
        <Language onClickCapture={onLanguagePress}>language </Language>

        <NavMenuBar style={{ display: navDisplay }}>
          {is_connected && (
            <div>
              <NavLinkBar
                // key={index}
                to={MenuItems[0].url}
                className={MenuItems[0].cName}>
                {MenuItems[0].title}
              </NavLinkBar>
              <NavLinkBar
                // key={index}
                to={MenuItems[1].url}
                className={MenuItems[1].cName}>
                {MenuItems[1].title}
              </NavLinkBar>
            </div>
          )}
          <NavLinkBar
            // key={index}
            to={MenuItems[2].url}
            className={MenuItems[2].cName}>
            {MenuItems[2].title}
          </NavLinkBar>
          <NavLinkBar
            // key={index}
            to={MenuItems[3].url}
            className={MenuItems[3].cName}>
            {MenuItems[3].title}
          </NavLinkBar>
          {!is_connected && (
            <NavLinkBar
              // key={index}
              to={MenuItems[4].url}
              className={MenuItems[4].cName}>
              {MenuItems[4].title}
            </NavLinkBar>
          )}
        </NavMenuBar>
        <NavBtn>
          <NavBtnLink
            to='/connection/login'
            style={{ display: navDisplay === "none" ? "flex" : "none" }}
            onClick={() => loginClick()}>
            {is_connected ? "Sign out" : "Sign in"}
          </NavBtnLink>
        </NavBtn>
        <div>
          <NavMenu style={{ display: navDisplay === "none" ? "flex" : "none" }}>
            <br />
            {is_connected && (
              <div style={styles.connected}>
                <NavLink
                  // key={index}
                  to={MenuItems[0].url}
                  className={MenuItems[0].cName}>
                  {MenuItems[0].title}
                  <br />
                </NavLink>
                <NavLink
                  // key={index}
                  to={MenuItems[1].url}
                  className={MenuItems[1].cName}>
                  {MenuItems[1].title}
                  <br />
                </NavLink>
              </div>
            )}
            <NavLink
              // key={index}
              to={MenuItems[2].url}
              className={MenuItems[2].cName}>
              {MenuItems[2].title}
              <br />
            </NavLink>
            <NavLink
              // key={index}
              to={MenuItems[3].url}
              className={MenuItems[3].cName}>
              {MenuItems[3].title}
              <br />
            </NavLink>
            {!is_connected && (
              <NavLink
                // key={index}
                to={MenuItems[4].url}
                className={MenuItems[4].cName}>
                {MenuItems[4].title}
                <br />
              </NavLink>
            )}
          </NavMenu>
        </div>
      </Nav>
    </>
  );
};
const styles = {
  formStyle: {
    color: "#15cdfc",
    position: "absolute",
    left: 65,
    top: 20,
  },
  connected: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
export default Navbar;
