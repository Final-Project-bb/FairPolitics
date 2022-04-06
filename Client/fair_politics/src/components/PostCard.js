import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { algorithms } from "./algorithmDetails";

import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
  ButtonGroup,
  Divider,
  IconButton,
  Avatar,
  Link,
  Grid,
  Tooltip,
  Box,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import Comments from "./Comments";

const PostCard = ({ item, inProfile }) => {
  const [commentsButtonId, setCommentsButtonId] = useState(0);
  const [commentsButton, setCommentsButton] = useState(false);
  const [comment, setComment] = useState("");
  const [poll_algo, setPollAlgo] = useState(1);

  // const [post, setPost] = useState(item);
  const [likes, setLikes] = useState(item.likes);
  const [comments, setComments] = useState(item.comments);
  const [userName, setUserName] = useState("");

  const {
    user_details,
    setLoading,
    PostCards,
    setCurrentItem,
    algo_id,
    currentItem,
    setFriendDetails,
    setInFriend,
  } = useContext(AppContext);

  const history = useHistory();

  let algoName = !inProfile
    ? algorithms.filter((item) => item.id == poll_algo)[0].title
    : algorithms.filter((item) => item.id == algo_id)[0].title;

  useEffect(() => {
    algoName = !inProfile
      ? algorithms.filter((item) => item.id == poll_algo)[0].title
      : algorithms.filter((item) => item.id == algo_id)[0].title;
    getUserDetails();
    getResult();
  }, []);

  const FriendProfileRef = async () => {
    let id = item.user_id;
    // console.log(id);

    await fetch(`http://localhost:4000/api/get_user_by_id/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.result[0]);
        setFriendDetails(json.result[0]);
      })
      .catch((err) => console.error(err));
    setInFriend(true);
    history.push("/FriendProfile");
  };

  const getFriendAlgo = async () => {
    await fetch(`http://localhost:4000/api/get_algorithm/${item.user_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        json.result[0] !== undefined &&
          setPollAlgo(json.result[0].algorithm_id);
      })
      .catch((err) => console.error(err));
  };

  const sort = async (e) => {
    // e.preventDefault()
    // setLoading(true);
    if (!inProfile) {
      getFriendAlgo();
    }
    let algo = !inProfile
      ? algorithms.filter((item) => item.id == poll_algo)[0].code
      : algorithms.filter((item) => item.id == algo_id)[0].code;
    // console.log(`Poll algorithm: ${algo}`);
    return await fetch(
      `http://localhost:4000/api/post_algo/${item.post_id}/${algo}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        // setOrderAnswer(json.answers);
        // alert(json.answers);
        // console.log(json);
        // console.log("json.orderAnswer");
        // console.log(json.orderAnswer);
        return json;
      })
      .catch((err) => console.error(err));
    // setLoading(false);
  };

  const getResult = async () => {
    // console.log("getResult()");
    // console.log(await getResult());
    // console.log(orderAnswer);
    // console.log("item.answers");
    // console.log(item.answers);
    let data = await sort();
    let sorting = data.comments;
    // let order = data.orderAnswer;
    // let count = data.answersCount;
    // let sumOfUsers = data.sumOfUsers;
    // console.log("sorting");
    // console.log(sorting);
    // console.log("order");
    // console.log(order);
    // console.log(item)
    var result = item.comments
      .map((item) => {
        var n = sorting.indexOf(item.comment_id);
        sorting[n] = "";
        return [n, item];
      })
      .sort()
      .map((j) => {
        return j[1];
      });
    // setIsSortingPress(true);
    // result.forEach((e) => {
    //   e.percents = order[e.answer_id] == undefined ? 0 : order[e.answer_id];
    //   e.answerCount = count[e.answer_id] == undefined ? 0 : count[e.answer_id];
    //   e.sumOfUsers = sumOfUsers;
    // });
    // result.press=true;
    // console.log("result");
    // console.log(result);
    setComments(result);
    // item.answers = result;
    // item.press = true;

    // console.log(orderAnswer);
    // console.log("new item.answers");
    // console.log(item.answers);
    // console.log("new item.press");
    // console.log(item.press);
    setLoading(false);
  };

  const toggleCommentsButton = () => {
    setCommentsButtonId(item.post_id);
    if (commentsButton) {
      setCommentsButton(!commentsButton);
    } else {
      setCommentsButton(!commentsButton);
    }
  };

  const getUserDetails = async () => {
    let id = item.user_id;
    await fetch(`http://localhost:4000/api/get_user_by_id/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.result[0]);
        setUserName({
          first_name: json.result[0].first_name,
          last_name: json.result[0].last_name,
        });
        // return json.result[0];
      })
      .catch((err) => console.error(err));
  };

  const LikePost = async () => {
    likes.filter((like) => like === user_details.user_id).length > 0
      ? setLikes(likes.filter((like) => like !== user_details.user_id))
      : setLikes([...likes, user_details.user_id]);

    const details = {
      post_id: item.post_id,
      user_id: user_details.user_id,
    };
    await fetch(`http://localhost:4000/api/add_like_to_Post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };

  const addComment = async () => {
    const comment_details_to_server = {
      post_id: item.post_id,
      user_id: user_details.user_id,
      comment: comment,
    };
    await fetch(`http://localhost:4000/api/add_comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment_details_to_server),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const comment_details = {
          comment_id: json.id[0].comment_id,
          user_id_comment: user_details.user_id,
          comment: comment,
          comment_likes: [],
        };
        setComments([...comments, comment_details]);
        setComment("");
      })
      .catch((err) => console.error(err));
  };

  const editPost = () => {
    setCurrentItem(item);
    history.push("/profile/editPost");
  };
  
  const deletePost = async () => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this post?")) {
      await fetch(`http://localhost:4000/api/delete_Post/${item.post_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .catch((error) => console.error(error));
    }
    setLoading(false);
  };

  return (
    <div style={styles.head}>
      <Card style={styles.card}>
        {inProfile && (
          <CardContent style={{ display: "flex", flex: 3 }}>
            <Tooltip title='Edit'>
              <IconButton
                onClick={(e) => editPost(e)}
                sx={[
                  {
                    "&:hover": { color: "black" },
                    cursor: "pointer",
                    color: "#616161",
                  },
                ]}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton
                onClick={(e) => deletePost(e)}
                sx={[
                  {
                    "&:hover": { color: "black" },
                    cursor: "pointer",
                    color: "#616161",
                  },
                ]}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardContent>
        )}
        <CardContent style={{ display: "block", verticalAlign: "middle" }}>
          <Tooltip title='Go To Profile'>
            <IconButton onClick={FriendProfileRef} sx={{ p: 0 }}>
              <Grid container direction='column' alignItems='center'>
                <Grid item>
                  <Avatar
                    alt='Remy Sharp'
                    src={
                      require("../images/profilePicExmple.jpg")
                      //user_details.profile_picture
                    }
                  />
                </Grid>
                <Grid item fontSize='small' style={{ marginTop: 8 }}>
                  {/* {item.user_id} */}
                  {userName.first_name} {userName.last_name}
                </Grid>
              </Grid>
            </IconButton>
          </Tooltip>
          <br />
        </CardContent>
        <CardContent style={styles.title}>
          {item.post_id} {item.title}
        </CardContent>
        <CardContent style={styles.text}>{item.description}</CardContent>
        <CardActions>
          <Tooltip
            title={
              likes.filter((like) => like === user_details.user_id).length > 0
                ? "Unlike"
                : "Like"
            }>
            <IconButton sx={{ marginRight: "auto" }} onClick={() => LikePost()}>
              <FavoriteIcon
                label={likes.length}
                fontSize='medium'
                sx={[
                  {
                    cursor: "pointer",
                    color:
                      likes.filter((like) => like === user_details.user_id)
                        .length > 0
                        ? "#e53935"
                        : "#616161",
                    marginRight: 1,
                  },
                ]}
              />
              {likes.length}
            </IconButton>
          </Tooltip>
          {/* <CardContent> */}
          <ExpandMore
            expand={commentsButton}
            onClick={() => toggleCommentsButton()}
            aria-expanded={commentsButton}
            aria-label='show more'>
            <Tooltip
              title={
                comments[0].comment_id !== null
                  ? !commentsButton
                    ? `Show Comments`
                    : `Hide Comments`
                  : "No Comments Yet! be the first"
              }>
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
          ({comments[0].comment_id !== null ? comments.length : 0})
          {/* </CardContent> */}
        </CardActions>
        <Collapse in={commentsButton} timeout='auto' unmountOnExit>
          <CardContent>
            {comments[0].comment_id !== null &&
              comments.map((comment) => {
                return (
                  <Comments
                    key={comment.comment_id}
                    item={item}
                    comment={comment}
                    setComment={setComment}
                    setComments={setComments}
                    comments={comments}
                  />
                );
              })}

            <TextField
              sx={{ width: "80%" }}
              // helperText='Tagged elected officials - Example: @israel israel @other person'
              id='standard-basic'
              variant='standard'
              // label='Add Comment'
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add comment'
            />
            <Tooltip title='Send'>
              <SendIcon
                sx={styles.sendButton}
                variant='contained'
                onClick={() => addComment()}
              />
            </Tooltip>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

PostCard.deafult = {
  inProfile: false,
  // onEdit: false,
  // setOnEdit: () => {},
};

const styles = {
  card: {
    // height: 400,
    width: 600,
  },
  content: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    // marginBottom: 30,
  },
  head: {
    display: "flex",

    // justifyContent: "space-around",
    // flexDirection: "column",
    marginBottom: 30,
    marginRight: 30,
  },
  title: {
    display: "flex",
    justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    // top: 100,
    // right:150
  },
  editCommentForm: {
    display: "flex",
    flex: 7,
  },
  text: {
    // display: "flex",
    // justifyContent: "space-around",
    // flexDirection: "colmun",
    // position: "relative",
    // // marginLeft:10,
    // top: 10,
    // left: -15,
  },
  cardFooter: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "row",
    // position: "relative",
    // marginLeft:10,
    // top: 50,
    // right: 20,
  },
  likes: {
    display: "flex",
    flexDirection: "row",

    // position: "relative",
    // right: 70,
  },
  commentContent: {
    flex: 15,
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  sendButton: [
    {
      "&:hover": {
        color: "#2196f3",
        backgroundColor: "white",
      },
      "&:active": {
        color: "#1769aa",
        backgroundColor: "white",
      },
      cursor: "pointer",
      width: "20%",
    },
  ],
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default PostCard;
