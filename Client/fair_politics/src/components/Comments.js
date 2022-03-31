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
  Grid,
  Tooltip,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

const Comments = ({
  item,
  comment,
  setComment,
  setComments,
  comments,
  //   getUserDetails,
}) => {
  const [commentEdit, setCommentEdit] = useState("");
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [commentsEditButtonId, setCommentsEditButtonId] = useState(0);
  const [userName, setUserName] = useState("");
  const [commentLikes, setCommentLikes] = useState(comment.comment_likes);

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

  const getUserDetails = async () => {
    let id = comment.user_id_comment;
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

  const FriendProfileRef = async () => {
    let id = comment.user_id_comment;
    // console.log(id);

    await fetch(`http://localhost:4000/api/get_user_by_id/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result[0]);
        setFriendDetails(json.result[0]);
      })
      .catch((err) => console.error(err));
    setInFriend(true);
    history.push("/FriendProfile");
  };

  const editComment = async (comment_id) => {
    const newComment = {
      comment: commentEdit,
    };
    await fetch(`http://localhost:4000/api/update_comment/${comment_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
    setComment("");

    setComments((prevComments) => {
      let newcomment = prevComments.filter(
        (comment) => comment.comment_id === comment_id
      )[0];
      newcomment.comment = commentEdit;
      let newComments = prevComments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      newComments.push(newcomment);
      return newComments;
    });

    setEditCommentForm(false);
  };

  const deleteComment = async (comment_id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(
        comments.filter((comment) => comment.comment_id !== comment_id)
      );
      await fetch(`http://localhost:4000/api/delete_comment/${comment_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
      setComment("");
    }
  };

  const LikeComment = async (comment_id) => {
    commentLikes.filter((like) => like === user_details.user_id).length > 0
      ? setCommentLikes(
          commentLikes.filter((like) => like !== user_details.user_id)
        )
      : setCommentLikes([...commentLikes, user_details.user_id]);

    const details = {
      comment_id: comment_id,
      user_id: user_details.user_id,
    };
    await fetch(`http://localhost:4000/api/add_like_to_comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <CardContent style={styles.commentContent}>
        <CardContent
          // style={{ display: "block", verticalAlign: "middle" }}
          sx={{ width: "15%", padding: 0 }}>
          <Tooltip title='Go To Profile'>
            <IconButton onClick={FriendProfileRef}>
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
                  {userName.first_name} {userName.last_name}
                </Grid>
              </Grid>
            </IconButton>
          </Tooltip>
        </CardContent>
        <Divider orientation='vertical' flexItem />

        <div style={{ display: "flex", flex: 8, marginLeft: 20 }}>
          {comment.comment}
        </div>
        {comment.user_id_comment === user_details.user_id && (
          <>
            {editCommentForm && commentsEditButtonId === comment.comment_id && (
              <CardContent style={styles.editCommentForm}>
                <TextField
                  size='small'
                  id='standard-basic'
                  variant='standard'
                  placeholder='Edit Comment'
                  type='text'
                  value={commentEdit}
                  onChange={(e) => setCommentEdit(e.target.value)}
                />
                <SendIcon
                  sx={[{ "&:hover": { color: "#2196f3" }, cursor: "pointer" }]}
                  size='small'
                  onClick={() => editComment(comment.comment_id)}
                />
              </CardContent>
            )}
            <Tooltip title='Edit'>
              <IconButton
                sx={[
                  {
                    "&:hover": { color: "black" },
                    cursor: "pointer",
                    color: "#616161",
                  },
                ]}
                onClick={() => {
                  setEditCommentForm(!editCommentForm);
                  setCommentsEditButtonId(comment.comment_id);
                  setCommentEdit(comment.comment);
                }}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Delete'>
              <IconButton
                sx={[
                  {
                    "&:hover": { color: "black" },
                    cursor: "pointer",
                    color: "#616161",
                  },
                ]}
                onClick={() => deleteComment(comment.comment_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
          </>
        )}
        
        <Tooltip
          title={
            commentLikes.filter((like) => like === user_details.user_id)
              .length > 0
              ? "Unlike"
              : "Like"
          }>
          <IconButton onClick={() => LikeComment(comment.comment_id)}>
            <FavoriteBorderIcon
              sx={{
                color:
                  commentLikes.filter((like) => like === user_details.user_id)
                    .length > 0
                    ? "#e53935"
                    : "#616161",
              }}
            />
        
            <div style={{marginLeft: 10, fontSize: 15}}>{commentLikes.length}</div>
          </IconButton>

          {/* {comment.comment_likes.length} */}
          {/* </FavoriteBorderIcon> */}
        </Tooltip>

      </CardContent>
      <Divider variant='middle' />
    </div>
  );
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
};
export default Comments;
