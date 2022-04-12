import React from "react";
import Header from "./Header";
import styled from "styled-components";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  Grid,
  Link,
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";

const ContactUs = () => {
  const team = [
    {
      name: "Omer Shalom",
      linkedIn: "https://www.linkedin.com/in/omer-shalom-18915720a/",
      gitHub: "https://github.com/Omer2041",
      picture:
        "https://avatars.githubusercontent.com/u/73235082?s=400&u=7490e61927c32eb85a62a3a86d52c6423b6d6045&v=4",
      role: "FullStack Developer",
      gmail: "Omer2346@gmail.com",
    },
    {
      name: "Tal Schreiber",
      linkedIn: "https://www.linkedin.com/in/tal-schreiber/",
      gitHub: "https://github.com/TalSchreiber95",
      picture: "https://avatars.githubusercontent.com/u/58589007?v=4",
      role: "FullStack Developer",
      gmail: "TalSchreiber95@outlook.com",
    },
    {
      name: "Shai Bonfil",
      linkedIn: "https://www.linkedin.com/in/shai-bonfil-42bb94208/",
      gitHub: "https://github.com/shaiBonfil",
      picture:
        "https://media-exp1.licdn.com/dms/image/C5603AQGxOViX27z8Ng/profile-displayphoto-shrink_800_800/0/1617562352529?e=1655337600&v=beta&t=Srn0uiJttas_kwZGqzw_ZTMeFmNqYdrjYwnfjNaXvas",
      role: "FullStack Developer",
      gmail: "ShaiBonfil500@gmail.com",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "whitesmoke" }}>
      <Header title='Contact-us Page' />
      <div style={{ position: "relative" }}>
        <Grid
          container
          spacing={0}
          direction='row'
          sx={{ alignItems: "center", justifyContent: "space-around" }}>
          {team.map((dev) => {
            return (
              <Card key={dev.name} sx={styles.card}>
                <CardContent sx={styles.content}>
                  <Typography variant='h5' component='div'>
                    {dev.name}
                  </Typography>
                </CardContent>
                <CardContent sx={styles.content}>
                  {/* <Tooltip title='Go To Profile'> */}
                  {/* <IconButton
                    // onClick={FriendProfileRef}
                    sx={{
                      // position: "relative",
                      top: 30,
                      justifyContent: "center",
                      textAlign: "center",
                    }}> */}
                    <Grid container direction='column' alignItems='center'>
                      <Avatar
                        sx={{
                          width: 150,
                          height: 150,
                        }}
                        size='400'
                        alt='Remy Sharp'
                        src={dev.picture}
                      />
                      <Grid item fontSize='medium' sx={{ marginTop: 3 }}>
                        {dev.role}
                      </Grid>
                    </Grid>
                  {/* </IconButton> */}
                  {/* </Tooltip> */}
                </CardContent>
                {/* </Grid> */}
                <CardContent style={styles.content}>
                <CardContent sx={styles.content}>{dev.gmail}</CardContent>
                  <Link href={dev.linkedIn} style={styles.content}>
                    LinkedIn Account
                  </Link>
                  <Link href={dev.gitHub} style={styles.content}>
                    GitHub Account
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        <Link
          sx={styles.content}
          href='https://github.com/Final-Project-bb/FairPolitics'>
          Our GitHub Organization
        </Link>
      </div>
    </Box>
  );
};

const styles = {
  card: {
    // minHeight: 400,
    width: 400,
    top: 50,
    // left: "30%",
    // position: "relative",
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: "center",
    // alignSelf: "center",
    margin: 5,
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

export default ContactUs;
