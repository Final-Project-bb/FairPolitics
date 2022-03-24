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


import { useHistory } from "react-router-dom";
import { AppContext } from "./Context";

const activePages = ["Home", "About", "Contact-Us"];
const inActivePages = ["About", "Contact-Us"];
const activeSettings = ["Profile", "Account", "Algorithms", "Logout"];
const inActiveSettings = ["Login", "Sign-Up"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [search, setSearch] = useState();

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
  } = useContext(AppContext);

  const history = useHistory();

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("button clicked from openNav menu");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log("button clicked from openUser menu");
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    console.log("button clicked from closeNav menu");
    history.push(`/${page}`);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    console.log("button clicked from closeUser menu");
    switch (setting) {
      case "Account":
        history.push("/profile/aboutProfile");
        break;
      case "Profile":
        history.push("/profile");
        break;
      case "Login":
        history.push("/connection/login");
        break;
      case "Algorithms":
        alert("Algorithms press");
        // history.push("/connection/login");
        break;
      case "Sign-Up":
        history.push("/connection/register");
        break;
      case "Logout":
        setIsConnected(false);
        setUserDetails({});
        setFollowerDetails([]);
        setFollowingDetails([]);
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
    <AppBar position='static'>
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
                    sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                ))
              : inActivePages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={onSearch}>
              <StyledInputBase
                placeholder='Search…'
                // inputProps={{ 'aria-label': 'search' }}
                onKeyDown={handleKeyDown(onSearch)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt='Remy Sharp'
                  src={
                    is_connected ? "../images/profilePicExmple.jpg" : ''
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
  );
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
