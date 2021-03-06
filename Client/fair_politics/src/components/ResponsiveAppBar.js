import React, { useContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CssBaseline from "@mui/material/CssBaseline";
import { useStateIfMounted } from "use-state-if-mounted";

import { useHistory } from "react-router-dom";
import { AppContext } from "./Context";

const activePages = ["Home", "Profile", "Algorithms", "About", "Contact-Us"];
const inActivePages = ["About", "Contact-Us"];
const activeSettings = ["Profile", "Account", "Algorithms", "Logout"];
const inActiveSettings = ["Login", "Sign-Up"];

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = useStateIfMounted(null);
  const [anchorElUser, setAnchorElUser] = useStateIfMounted(null);

  const {
    user_details,
    setLoading,
    setUsersSearch,
    setUserDetails,
    is_connected,
    setIsConnected,
    setFollowerDetails,
    setFollowingDetails,
    setFollowers,
    setFollowings,
    search,
    setSearch,
    setInFriend,
  } = useContext(AppContext);

  const history = useHistory();

  const onSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setLoading(true);
    fetchSearchUsers();
    setLoading(false);
    window.localStorage.setItem("search", search);
    history.push("/search");
  };
  const fetchSearchUsers = async () => {
    const response = await fetch(
      `http://localhost:4000/api/search_by_name/${search}/${user_details.user_id}`
    );
    const data = await response.json();
    console.log(data.result);
    setUsersSearch(data.result);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    // console.log("button clicked from openNav menu");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // console.log("button clicked from openUser menu");
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    // console.log("is_connected",is_connected);
    // console.log(history.location.pathname);
    // console.log("button clicked from closeNav menu");
    if (typeof page === "object") {
      return;
    }
    history.push(`/${page}`);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    // console.log("button clicked from closeUser menu");
    switch (setting) {
      case "Account":
        setInFriend(false);
        window.localStorage.setItem("infriend", false);
        history.push("/profile/aboutProfile");
        break;
      case "Profile":
        history.push("/Profile");
        break;
      case "Login":
        history.push("/connection/login");
        break;
      case "Algorithms":
        history.push("/Algorithms");

        // history.push("/connection/login");
        break;
      case "Sign-Up":
        history.push("/connection/register");
        break;
      case "Logout":
        setIsConnected(false);
        setUserDetails({});
        localStorage.removeItem("user");
        localStorage.removeItem("isconnected");
        localStorage.removeItem("algoName");
        localStorage.removeItem("algoID");
        // window.localStorage.setItem("user", JSON.stringify({}));
        // window.localStorage.setItem("isconnected", false);
        // setUserDetails(JSON.parse(user));
        // setIsConnected(isconnected);
        // setFollowerDetails([]);
        // setFollowingDetails([]);
        setFollowers([]);
        setFollowings([]);
        setLoading(false);
        history.push("/connection/login");
        break;
      default:
        break;
    }
    // history.push(`/${page}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <ElevationScroll {...props}>
        <AppBar color='info' position='fixed' sx={{ bottom: "auto", top: 0 }}>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                Fair Politics
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}>
                  {/* left menu */}
                  {is_connected
                    ? activePages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => handleCloseNavMenu(page)}>
                          <Typography textAlign='center'>{page}</Typography>
                        </MenuItem>
                      ))
                    : inActivePages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => handleCloseNavMenu(page)}>
                          <Typography textAlign='center'>{page}</Typography>
                        </MenuItem>
                      ))}
                </Menu>
              </Box>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                Fair Politics
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* main menu */}
                {is_connected
                  ? activePages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                        sx={styles.NavButton}
                        variant={
                          history.location.pathname === `/${page}`
                            ? "outlined"
                            : "text"
                        }
                        color='inherit'>
                        {page}
                      </Button>
                    ))
                  : inActivePages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                        sx={styles.NavButton}
                        variant={
                          history.location.pathname === `/${page}`
                            ? "outlined"
                            : "text"
                        }
                        color='inherit'>
                        {page}
                      </Button>
                    ))}
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {is_connected && (
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <form onSubmit={onSearch}>
                      <StyledInputBase
                        placeholder='Search???'
                        // inputProps={{ 'aria-label': 'search' }}
                        onKeyDown={handleKeyDown(onSearch)}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                  </Search>
                )}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {is_connected ? (
                  <Tooltip title='Logout'>
                    <IconButton
                      size='large'
                      onClick={() => handleCloseUserMenu("Logout")}
                      color='inherit'
                      sx={{ mr: 3 }}>
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title='Login'>
                    <Button
                      variant={
                        history.location.pathname === "/" ||
                        history.location.pathname === "/connection/login"
                          ? "outlined"
                          : "text"
                      }
                      size='large'
                      onClick={() => history.push("/")}
                      color='inherit'
                      sx={{ mr: 3 }}>
                      <LoginIcon />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt='Remy Sharp'
                      src={
                        is_connected
                          ? require("../images/profilePicExmple.jpg")
                          : ""
                        //user_details.profile_picture
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {/* right menu */}
                  {is_connected
                    ? activeSettings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => handleCloseUserMenu(setting)}>
                          <Typography textAlign='center'>{setting}</Typography>
                        </MenuItem>
                      ))
                    : inActiveSettings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => handleCloseUserMenu(setting)}>
                          <Typography textAlign='center'>{setting}</Typography>
                        </MenuItem>
                      ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

const styles = {
  NavButton: [
    {
      "&:hover": {
        color: "#2196f3",
        backgroundColor: "white",
      },
      // '&:active': {
      //   boxShadow: 'none',
      //   backgroundColor: '#0062cc',
      //   borderColor: '#005cbf',
      // },
      // '&:focus': {
      //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      // },
      my: 2,
      color: "white",
      display: "block",
      marginLeft: 2,
    },
  ],
};
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 30,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default ResponsiveAppBar;
