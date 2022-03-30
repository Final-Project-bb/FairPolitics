import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
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
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import Comments from "./Comments";

const PostCard = ({ item, inProfile }) => {
  const [commentsButtonId, setCommentsButtonId] = useState(0);
  const [commentsButton, setCommentsButton] = useState(false);
  const [comment, setComment] = useState("");

  // const [post, setPost] = useState(item);
  const [likes, setLikes] = useState(item.likes);
  const [comments, setComments] = useState(item.comments);
  const [userName, setUserName] = useState("");

  const {
    user_details,
    setLoading,
    PostCards,
    setCurrentItem,
    currentItem,
    setFriendDetails,
    setInFriend,
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    getUserDetails();
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
        return json.result[0];
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
    const comment_details = {
      post_id: item.post_id,
      user_id: user_details.user_id,
      comment: comment,
    };
    setComments([...comments, comment_details]);
    await fetch(`http://localhost:4000/api/add_comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment_details),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
    setComment("");
  };

  const editPost = () => {
    setCurrentItem(item);
    history.push("/profile/editPost");
  };

  const deletePost = async () => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this post?")) {
      await fetch(
        `http://localhost:4000/api/delete_Post/${item.post_id}`,
        {
          method: "DELETE",
        }
      )
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
              <EditIcon
                sx={[{ "&:hover": { color: "#2196f3" }, cursor: "pointer" }]}
                style={{ flex: 0.1 }}
                onClick={(e) => editPost(e)}
              />
            </Tooltip>
            <Tooltip title='Delete'>
              <DeleteIcon
                sx={[{ "&:hover": { color: "#2196f3" }, cursor: "pointer" }]}
                style={{ flex: 0.1 }}
                onClick={(e) => deletePost(e)}
              />
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
        <CardContent style={styles.cardFooter}>
          <CardActions>
            {/* <ButtonGroup> */}
            {/* variant={likes.filter(like => like === user_details.user_id).length > 0 ? 'contained' : 'outlined' } */}
            <Tooltip
              title={
                item.likes.filter((like) => like === user_details.user_id)
                  .length > 0
                  ? "Unlike"
                  : "Like"
              }>
              <FavoriteBorderIcon
                label={likes.length}
                fontSize='large'
                sx={[{ "&:hover": { color: "#2196f3" }, cursor: "pointer" }]}
                style={{
                  display: "flex",
                  flex: 1,
                  marginRight: 20,
                }}
                color={
                  likes.filter((like) => like === user_details.user_id).length >
                  0
                    ? "error"
                    : "outlined"
                }
                onClick={() => LikePost()}
              />
            </Tooltip>
            <Link
              component='button'
              variant='body2'
              // variant={
              //   commentsButton && commentsButtonId === item.post_id
              //     ? "contained"
              //     : "outlined"
              // }
              // color='primary'
              onClick={() => toggleCommentsButton()}>
              {comments[0].comment_id !== null
                ? !commentsButton
                  ? `Show Comments`
                  : `Hide Comments`
                : "No Comments Yet! be the first"}
              ({comments[0].comment_id !== null ? comments.length : 0})
            </Link>
            {/* </ButtonGroup> */}
          </CardActions>
        </CardContent>
        {commentsButton && commentsButtonId === item.post_id && (
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
          </CardContent>
        )}
        {commentsButton && commentsButtonId === item.post_id && (
          <CardContent>
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
        )}
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

export default PostCard;
