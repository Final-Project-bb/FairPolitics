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
  Divider,
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
    return () => {};
  }, []);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header />
      {chosenAlgorithm === -1 && (
        <CardContent sx={{ color: "red" }}>
          Please Choose Algorithm to use for the haluka hogenet{" "}
        </CardContent>
      )}
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ borderRadius: 20, elevation: 3 }}
          width={900}
          src={require("../images/algoPic.jpg")}
        />
      </CardContent>
      <Divider variant='middle' />

      <CardContent sx={{}}>
        <div>
          {
            "Let Answers = {a, b, c, d, e} and assume alphabetic tiebreaking. Consider a set of 9 voters"
          }
          {
            "with the following approval sets: 5 voters voted to {a, b}, 3 voters voted to {c, d}, 1 voter voted to {e}."
          }
          {
            "Let V denote the group consisting of the 5 voters voted to {a, b} and V' the group consisting of the 3 voters voted to {c, d}."
          }
          {"First, consider Dynamic Sequential PAV and Dynamic Phragmen."}
          {
            "In the first iteration, both rules output round1 = (a, c, b, d, e), effectively alternating between answers supported by voter groups V and V'."
          }
          {
            "Let us assume that from V we first implements answer 'b'. Then, the two rules output round2 = (c, a, d, e)."
          }
          {
            "If the next implemented answer is 'd', both rules output round3 = (a, c, e)."
          }
          {"Next, consider Myopic Sequential PAV and Myopic Phragmen."}
          {
            "In the first iteration, both rules (and AV) rank the answers according to their number of votes: round1 = (a, b, c, d, e)."
          }
          {
            "After the implementation of answer 'b', both rules output round2 = (c, d, a, e), which differs from the AV ranking round2 = (a, c, d, e)."
          }
          {
            "If we then implements answer 'd', the two rules output round3 = (a, c, e)."
          }
        </div>
      </CardContent>
      <Divider variant='middle' />
      <CardContent sx={{ fontWeight: "medium" }}>
        NOTE: THE CHOSEN ALGORITHM HERE IS USED TO COMPUTE THE RESULTS ON YOUR
        POLLS , POSTS AND COMMENTS.
      </CardContent>
      <Grid container spacing={0} direction='row' alignItems='center'>
        {algorithms.map((algo) => {
          return (
            <Box
              key={algo.id}
              sx={{
                width: 500,
                margin: 3,
                border: chosenAlgorithm === algo.id ? "2px solid #1769aa" : 0,
                borderRadius: "1.5%",
              }}>
              <Card raised sx={{ height: 400 }}>
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
                    variant={chosenAlgorithm === algo.id ? "contained" : "text"}
                    color='primary'
                    sx={{
                      position: "relative",
                      marginLeft: "auto",
                    }}
                    onClick={() => setAlgorithmChosen(algo.id)}>
                    {chosenAlgorithm === algo.id ? "Chosen" : "Choose"}
                  </Button>
                </CardContent>

                <CardContent
                  sx={{
                    fontWeight: "light",
                    fontSize: 17,
                    overflow: "auto",
                    height: 260,
                  }}>
                  {algo.description}
                </CardContent>
                <CardContent sx={{ fontWeight: "light", fontSize: 16 }}>
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
