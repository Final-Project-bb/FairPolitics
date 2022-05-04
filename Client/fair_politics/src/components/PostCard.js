import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { algorithms } from "./algorithmDetails";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStateIfMounted } from "use-state-if-mounted";

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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import Comments from "./Comments";
import EditPostCard from "./EditPostCard";

const PostCard = ({ item, inProfile, setAlert, setAlertContent }) => {
  const [commentsButtonId, setCommentsButtonId] = useStateIfMounted(0);
  const [commentsButton, setCommentsButton] = useStateIfMounted(false);
  const [comment, setComment] = useStateIfMounted("");
  const [poll_algo, setPollAlgo] = useStateIfMounted(1);

  // const [post, setPost] = useStateIfMounted(item);
  const [likes, setLikes] = useStateIfMounted(item.likes);
  const [comments, setComments] = useStateIfMounted(item.comments);
  const [userName, setUserName] = useStateIfMounted("");

  const [dialog, setDialog] = useStateIfMounted(false);
  const [dialogContent, setDialogContent] = useStateIfMounted("");

  const {
    user_details,
    setLoading,
    setCurrentItem,
    algo_id,
    setFriendDetails,
    setInFriend,
    setProfilePostCards,
  } = useContext(AppContext);

  const history = useHistory();

  // let algoName = !inProfile
  //   ? algorithms.filter((item) => item.id == poll_algo)[0].title
  //   : algorithms.filter((item) => item.id == algo_id)[0].title;
  const algoName = window.localStorage.getItem("algoName");

  useEffect(async () => {
    // algoName = !inProfile
    //   ? algorithms.filter((item) => item.id == poll_algo)[0].title
    //   : algorithms.filter((item) => item.id == algo_id)[0].title;

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
    const sort = async () => {
      if (!inProfile) {
        getFriendAlgo();
      }
      let algo = !inProfile
        ? algorithms.filter((item) => item.id == poll_algo)[0].code
        : algorithms.filter((item) => item.id == algo_id)[0].code;
      return await fetch(
        `http://localhost:4000/api/post_algo/${item.post_id}/${algo}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => {
          return json;
        })
        .catch((err) => console.error(err));
    };
    const getResult = async () => {
      let data = await sort();
      let sorting = data.comments;
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
      setComments(result);
      setLoading(false);
    };

    await getUserDetails();
    await getResult();
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

  const LikePost = async () => {
    likes.filter((like) => like === user_details.user_id).length > 0
      ? setLikes(likes.filter((like) => like !== user_details.user_id))
      : setLikes([...likes, user_details.user_id]);

    item.likes.filter((like) => like === user_details.user_id).length > 0
      ? (item.likes = item.likes.filter(
          (like) => like !== user_details.user_id
        ))
      : item.likes.push(user_details.user_id);

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
        item.comments.push(comment_details);
        setComment("");
      })
      .catch((err) => console.error(err));
  };

  const editPost = () => {
    setCurrentItem(item);
    history.push("/profile/editPost");
  };

  const deletePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDialog(false);
    await fetch(`http://localhost:4000/api/delete_Post/${item.post_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
        setProfilePostCards((prev) => {
          return prev.filter((post) => post.post_id !== item.post_id);
        });
        setLoading(false);
        setAlertContent("Post Deleted successfully");
        setAlert(true);
      })
      .catch((error) => console.error(error));

    setDialog(false);
    setLoading(false);
  };

  return (
    <div style={styles.head}>
      <Card raised sx={styles.card}>
        {inProfile && (
          <CardContent>
            <Tooltip title='Edit'>
              <IconButton
                onClick={() => {
                  setCurrentItem(item);
                  setDialogContent("Edit Post");
                  setDialog(true);
                }}
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
                onClick={() => {
                  setDialogContent("Delete Post");
                  setDialog(true);
                }}
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
        <CardContent sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title='Go To Profile'>
            <Typography sx={{ display: "flex", mr: "auto" }}>
              <Button
                onClick={FriendProfileRef}
                sx={[
                  {
                    "&:hover": {
                      // color: "#2196f3",
                      backgroundColor: "whitesmoke",
                      boxShadow: 3,
                    },
                    display: "flex",
                    flexDirection: "column",
                    // marginBottom: 5,
                    // p: 0,
                    // position: "absolute",
                  },
                ]}>
                <Avatar
                  sx={{ mb: 1 }}
                  alt='Remy Sharp'
                  src={
                    require("../images/profilePicExmple.jpg")
                    //user_details.profile_picture
                  }
                />
                {userName.first_name} {userName.last_name}
              </Button>
            </Typography>
          </Tooltip>
          <Typography
            variant='h5'
            sx={{
              display: "flex",
              justifyContent: "center",
              mx: "auto",
            }}>
            {item.post_id} {item.title}
          </Typography>
          <Typography
            variant='h7'
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              // mt: -5
              ml: "auto",
              color: "#607d8b",
            }}>
            {item.upload_date}
          </Typography>
        </CardContent>

        <CardContent style={styles.text}>{item.description}</CardContent>
        <CardActions>
          <Tooltip
            title={
              likes.filter((like) => like === user_details.user_id).length > 0
                ? "Unlike"
                : "Like"
            }>
            <Box sx={{ position: "relative" }}>
              <IconButton
                sx={{
                  color:
                    likes.filter((like) => like === user_details.user_id)
                      .length > 0
                      ? "#e53935"
                      : "#616161",
                }}
                onClick={() => LikePost()}>
                <FavoriteIcon label={likes.length} fontSize='medium' />
              </IconButton>
              ({likes.length})
            </Box>
          </Tooltip>
          <ExpandMore
            expand={commentsButton}
            onClick={() => toggleCommentsButton()}
            aria-expanded={commentsButton}
            aria-label='show more'>
            <Tooltip
              title={
                comments.length > 0
                  ? !commentsButton
                    ? `Show Comments`
                    : `Hide Comments`
                  : "No Comments Yet! be the first"
              }>
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
          ({comments[0].comment_id !== null ? comments.length : 0})
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
            <Box
              sx={{
                position: "relative",
                m: 3,
                color: "#bf360c",
                fontStyle: "italic",
                textAlign: "right",
                fontSize: 13,
              }}>
              {`Comments Ordered By ${algoName}`}
            </Box>
            <TextField
              sx={{ width: "80%" }}
              // helperText='Tagged elected officials - Example: @israel israel @other person'
              id='standard-basic'
              variant='standard'
              // label='Add Comment'
              type='text'
              value={comment}
              inputProps={{ maxLength: 1000 }}
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
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{dialogContent}</DialogTitle>
        {dialogContent === "Delete Post" && (
          <>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Are you sure you want delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialog(false)}>Cancel</Button>
              <Button onClick={(e) => deletePost(e)} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </>
        )}
        {dialogContent === "Edit Post" && (
          <>
            <DialogContent>
              <EditPostCard
                setDialog={setDialog}
                setAlert={setAlert}
                setAlertContent={setAlertContent}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialog(false)}>Cancel</Button>
              {/* <Button onClick={(e) => deletePost(e)} autoFocus>
                Yes
              </Button> */}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

PostCard.defaultProps = {
  inProfile: false,
  setAlert: () => {},
  setAlertContent: () => {},
};

const styles = {
  head: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
  },
  card: {
    // height: 400,
    // width: 600,
    width: "80%",
  },
  content: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    // marginBottom: 30,
  },

  title: {
    display: "flex",
    justifyContent: "center",
    mx: "auto",
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
