import React, { useContext } from "react";
import styled from "styled-components";
import ResponsiveAppBar from "./ResponsiveAppBar";

import { AppContext } from "./Context";
import { AppBar, Typography, Toolbar, Container, Box } from "@mui/material";

const Header = ({ title }) => {
  const { user_details, is_connected } = useContext(AppContext);

  return (
    <div style={styles.title}>
      <ResponsiveAppBar />
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters></Toolbar>
        </Container>
      </AppBar>
      {/* <Box sx={{ flexGrow: 1, height: 55 }}> */}
      <AppBar
        sx={{
          height: 55,
          // mt: 8,
          boxShadow: "0 3px 20px rgb(0 0 0 / 8%)",
          background: "#1769aa",
          color: "whitesmoke",
        }}
        position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='body2'
              noWrap
              component='div'
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: "lighter",
                fontSize: 20,
                color: "lightgray",
              }}>
              Welcome
              {is_connected
                ? `, ${user_details.first_name} ${user_details.last_name}!`
                : " Guest, please join us!"}{" "}
            </Typography>
          </Toolbar>
        </Container>
        {/* <label style={styles.text}></label> */}
      </AppBar>
    </div>
  );
};

Header.defaultProps = {
  title: "",
};

const styles = {
  head: {
    // color:"yellow",
    flex: 1,

    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    // flexDirection: "row",
    // // justifyContent: 'space-around',
    // marginTop: 0,
    // // margin  :0,
    // paddingVertical: 8,
    // // padding: 20,
    // textDecoration: "none",
    // // borderWidth: 4,
    // borderColor: "#20232a",
    // //   borderRadius: 0,
    // backgroundColor: "#61dafb",
    // color: "#20232a",
    // //   textAlign: "center",
    // // fontSize: 30,
    // fontWeight: "bold",
  },
  text: {
    // textAlign: "center",
    // display: "flex",
    position: "relative",
    color: "whitesmoke",
    // fontWeight: "100",
    fontSize: 20,
    justifyContent: "center",
    left: 10,
    top: 10,

    // left:100,
    // top:-25,
  },
};
const Nav = styled.nav`
  ${
    "" /* background: linear-gradient(135deg, rgb(11,15,67) 5%,rgb(27,100,221) ); */
  }
  ${"" /* width: 14px; */}
  ${"" /* height: 24px; */}
  ${
    "" /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */
  }
 ${"" /* background-position: 50% 50%; */}
 ${"" /* background-repeat: no-repeat; */}
  padding-left: 1rem;
  background: #1769aa;
  box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
  height: 50px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  margin-top: 20;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
export default Header;
