import React from "react";
import Header from "./Header";
import Loading from "./Loading";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";
const About = () => {
  return (
    <div>
      <Header title='About Page' />
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          Many times we see an imbalance between the issues that the elected
          offical focuses on and the issues that the electorate wanted to focus
          on. This case carries with it a problem of not fulfilling the will of
          the voters so we decided to fix this by developing a system called
          Fair Politic that will help the elected offical who wants to get
          feedback from his voter to know which issues to focus on in order to
          divide his time more correctly. We intend to build the feedback and
          implement Dynamic Proportional Rankings algorithm feedback so that the
          results they get reflects the will of the voters. This system will be
          conveniently and friendly to the electorate and elected by unique
          identification, Including support for a variety of languages common to
          the population.
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  card: {
    height: 400,
    // width: 600,
    // top: 50,
    // left: "30%",
    position: "relative",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "relative",
    fontSize: 25,
    // marginBottom: 30,
    fontSize: 25,
    top: 50,
  },
  // head: {
  //     display: "flex",
  //     justifyContent: 'space-around',
  //     flexDirection: 'column',
  // },
  // title: {
  //     display: "flex",
  //     justifyContent: 'space-around',
  //     // flexDirection: 'row',
  //     // position: "relative",
  //     // marginLeft:10,
  //     fontSize: 25,
  //     // top: 10,
  //     // right:150
  // },
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
  // cardFooter: {
  //     display: "flex",
  //     justifyContent: 'space-around',
  //     flexDirection: 'row',
  //     position: "relative",
  //     // marginLeft:10,
  //     top: 15,
  //     right: 20
  // },
  // likes: {
  //     position: "relative",
  //     right: 105,
  // },
  // comment: {
  //     position: "relative",
  //     top: 20,
  //     // right:105,
  // },
};

export default About;
