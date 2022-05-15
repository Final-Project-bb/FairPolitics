import React from "react";
import Header from "./Header";
import Loading from "./Loading";
import { AppContext } from "./Context";
import { useContext, useEffect } from "react";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  Grid,
} from "@mui/material";
const About = () => {
  const { setUserDetails, setIsConnected, isConnected } =
    useContext(AppContext);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const isconnected = window.localStorage.getItem("isconnected");
    setUserDetails(JSON.parse(user));
    setIsConnected(isconnected);
  }, []);

  return (
    <div style={{ background: "lightgray", minHeight: 800 }}>
      <Header title='About Page' />
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        // style={{ minHeight: "100vh" }}
      >
        <Card raised sx={styles.card}>
          <CardContent sx={styles.content}>
            Many times we see an imbalance between the issues that the elected
            offical focuses on and the issues that the electorate wanted to
            focus on.
            <CardContent sx={styles.content}>
              This case carries with it a problem of not fulfilling the will of
              the voters so we decided to fix this by developing a system called
              Fair Politic that will help the elected offical who wants to get
              feedback from his voter to know which issues to focus on in order
              to divide his time more correctly.
            </CardContent>
            <CardContent sx={styles.content}>
              We intend to build the feedback and implement Dynamic Proportional
              Rankings algorithm feedback so that the results they get reflects
              the will of the voters. This system will be conveniently and
              friendly to the electorate and elected by unique identification,
              Including support for a variety of languages common to the
              population.
            </CardContent>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

const styles = {
  card: {
    // minHeight: 400,
    width: "60%",
    my: 10,
    // top: 50,
    // left: "30%",
    // position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: "center",
    // alignSelf: "center",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "column",
    position: "relative",
    fontSize: 20,
    // marginBottom: 30,
    fontWeight: 25,
    // top: 50,
    textAlign: "center",
  },
  text: {
    display: "flex",
    // justifyContent: 'space-around',
    flexDirection: "column",
    position: "relative",
    // marginLeft:10,
    //   top: 0,
    fontSize: 25,
    //   left: 335,
  },
};

export default About;
