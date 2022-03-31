import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Context";
import Header from "./Header";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  Checkbox,
  IconButton,
  Avatar,
  Grid,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { algorithms } from "./algorithmDetails";

const Algorithms = () => {
  const [chosenAlgorithm, setChosenAlgorithm] = useState(-1);
  const { user_details, algo_id, setAlgoId } = useContext(AppContext);

  const getAlgorithmChosen = async () => {
    await fetch(
      `http://localhost:4000/api/get_algorithm/${user_details.user_id}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.result[0].algorithm_id);
        json.result[0] !== undefined &&
          setChosenAlgorithm(json.result[0].algorithm_id);
      })
      .catch((err) => console.error(err));
  };

  const setAlgorithmChosen = async (algoID) => {
    setChosenAlgorithm(algoID);
    // console.log(algoID);
    setAlgoId(algoID);
    await fetch(
      `http://localhost:4000/api/choose_algorithm/${user_details.user_id}/${algoID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(newPost),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // setChosenAlgorithm(json);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAlgorithmChosen();
  }, []);

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header />
      {chosenAlgorithm === -1 && (
        <CardContent sx={{ color: "red" }}>
          Please Choose Algorithm to use for the haluka hogenet{" "}
        </CardContent>
      )}
      <CardContent sx={{ color: "#616161" }}>
       NOTE: THE CHOSEN ALGORITHM HERE IS USED TO COMPUTE THE RESULTS ON YOUR POLLS , POSTS AND COMMENTS.
      </CardContent>
      <Grid container spacing={0} direction='row' alignItems='center'>
        {algorithms.map((algo) => {
          return (
            <Box
              key={algo.id}
              sx={{
                boxShadow: 3,
                width: 500,
                margin: 3,
                border: chosenAlgorithm === algo.id ? "2px solid #1769aa" : 0,
                borderRadius: "2%",
              }}>
              <Card>
                {/* <CardContent sx={{ fontWeight: "bold", fontSize: 30 }}>
                id: {algo.id}
              </CardContent> */}
                <CardContent
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    fontSize: 22,
                    flexDirection: "row",
                    // flex: 4,
                  }}>
                  <label>{algo.title}</label>
                  <Button
                    variant={
                      chosenAlgorithm === algo.id ? "contained" : "text"
                    }
                    color='primary'
                    sx={{
                      position: "relative",
                      alignContent: "flex-end",
                      justifyContent: "flex-end",
                      textAlign: "flex-end",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end",
                      marginLeft: "auto",
                    }}
                    onClick={() => setAlgorithmChosen(algo.id)}>
                    {chosenAlgorithm === algo.id ? "Chosen" : "Choose"}
                  </Button>
                </CardContent>

                <CardContent sx={{ fontWeight: "light", fontSize: 17 }}>
                  {algo.description}
                </CardContent>
                <CardContent sx={{ fontWeight: "light", fontSize: 16  }}>
                  Example: {algo.example}
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Grid>
    </div>
  );
};

export default Algorithms;
