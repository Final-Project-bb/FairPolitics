import React, { useState, useContext } from "react";
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
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DiscussionCard = ({ item, inProfile }) => {
  const [commentsButtonId, setCommentsButtonId] = useState(0);
  const [commentsButton, setCommentsButton] = useState(false);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState("");
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [commentsEditButtonId, setCommentsEditButtonId] = useState(0);
  // const [post, setPost] = useState(item);
  const [likes, setLikes] = useState(item.likes);
  const [comments, setComments] = useState(item.comments);

  const {
    user_details,
    setLoading,
    discussionCards,
    setCurrentItem,
    currentItem,
    setFriendDetails,
    setInFriend,
  } = useContext(AppContext);

  const history = useHistory();

  const FriendProfileRef = async () => {
    let id = item.user_id;
    console.log(id);

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

  const toggleCommentsButton = () => {
    setCommentsButtonId(item.post_id);
    if (commentsButton) {
      setCommentsButton(!commentsButton);
    } else {
      setCommentsButton(!commentsButton);
    }
  };

  const LikeComment = async (comment_id) => {
    // let newComments = comments;
    // if (
    //   comments
    //     .filter((comment) => comment.comment_id === comment_id)[0]
    //     .comment_likes.filter(
    //       (like_user_id) => like_user_id === user_details.user_id
    //     ).length > 0
    // ) {
    //   console.log("like exist");
    //   console.log(newComments);
    //   newComments.forEach((comment, index, object) => {
    //     if (comment.comment_id === comment_id) {
    //       // comment.comment_likes.splice(comment, 1);
    //       object.splice(index, 1);
    //     }
    //   });
    //   setComments(newComments);
    // } else {
    //   console.log("like unexist");
    //   newComments.forEach((comment) => {
    //     if (comment.comment_id === comment_id) {
    //       comment.comment_likes.push(user_details.user_id);
    //     }
    //   });
    //   setComments(newComments);
    // }

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

  const LikeDiscussion = async () => {
    likes.filter((like) => like === user_details.user_id).length > 0
      ? setLikes(likes.filter((like) => like !== user_details.user_id))
      : setLikes([...likes, user_details.user_id]);

    const details = {
      post_id: item.post_id,
      user_id: user_details.user_id,
    };
    await fetch(`http://localhost:4000/api/add_like_to_discussion`, {
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
    setEditCommentForm(false);
  };

  const deleteComment = async (comment_id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter((comment) => comment_id !== comment_id));
      await fetch(`http://localhost:4000/api/delete_comment/${comment_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
      setComment("");
    }
  };

  const editDiscussion = () => {
    setCurrentItem(item);
    history.push("/profile/editDiscussion");
  };

  const deleteDiscussion = async () => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this post?")) {
      await fetch(
        `http://localhost:4000/api/delete_discussion/${item.post_id}`,
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
          <CardContent>
            <EditIcon onClick={(e) => editDiscussion(e)} />
            <DeleteIcon onClick={(e) => deleteDiscussion(e)} />
          </CardContent>
        )}

        <CardContent style={{ display: "block", verticalAlign: "middle" }}>
          <IconButton onClick={FriendProfileRef} sx={{ p: 0 }}>
            <Avatar
              alt='Remy Sharp'
              src={
                require("../images/profilePicExmple.jpg")
                //user_details.profile_picture
              }
            />
          </IconButton>
          <Link component='button' variant='body2' onClick={FriendProfileRef}>
            {item.user_id}
          </Link>
        </CardContent>
        <CardContent style={styles.title}>
          {item.post_id} {item.title}
        </CardContent>
        <CardContent style={styles.text}>{item.description}</CardContent>
        <CardContent style={styles.cardFooter}>
          <CardActions>
            {/* <ButtonGroup> */}
            {/* variant={likes.filter(like => like === user_details.user_id).length > 0 ? 'contained' : 'outlined' } */}

            <FavoriteBorderIcon
              label={likes.length}
              fontSize='large'
              style={{
                display: "flex",
                flex: 1,
                marginRight: 20,
              }}
              color={
                likes.filter((like) => like === user_details.user_id).length > 0
                  ? "error"
                  : "outlined"
              }
              onClick={() => LikeDiscussion()}
            />
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
                  <div key={comment.comment_id}>
                    <CardContent style={styles.commentContent}>
                      <CardContent
                        style={{ display: "block", verticalAlign: "middle" }}>
                        <IconButton onClick={FriendProfileRef} sx={{ p: 0 }}>
                          <Avatar
                            alt='Remy Sharp'
                            src={
                              require("../images/profilePicExmple.jpg")
                              //user_details.profile_picture
                            }
                          />
                        </IconButton>
                        <Link
                          component='button'
                          variant='body2'
                          onClick={FriendProfileRef}>
                          {comment.user_id_comment}
                        </Link>
                      </CardContent>
                      <Divider orientation='vertical' flexItem />

                      <div style={{ display: "flex", flex: 8, marginLeft: 20 }}>
                        {comment.comment}
                      </div>
                      {comment.user_id_comment === user_details.user_id && (
                        <>
                          {editCommentForm &&
                            commentsEditButtonId === comment.comment_id && (
                              <CardContent style={styles.editCommentForm}>
                                <TextField
                                  size='small'
                                  id='standard-basic'
                                  // variant='standard'
                                  label='Update Comment'
                                  type='text'
                                  value={commentEdit}
                                  onChange={(e) =>
                                    setCommentEdit(e.target.value)
                                  }
                                />
                                <Button
                                  variant='contained'
                                  size='small'
                                  onClick={() =>
                                    editComment(comment.comment_id)
                                  }>
                                  Update
                                </Button>
                              </CardContent>
                            )}
                          <EditIcon
                            style={{ display: "flex", flex: 0.7 }}
                            onClick={() => {
                              setEditCommentForm(!editCommentForm);
                              setCommentsEditButtonId(comment.comment_id);
                              setCommentEdit(comment.comment);
                            }}
                          />
                          <DeleteIcon
                            style={{ display: "flex", flex: 0.7 }}
                            onClick={() => deleteComment(comment.comment_id)}
                          />
                          <Divider orientation='vertical' flexItem />
                        </>
                      )}
                      <FavoriteBorderIcon
                        style={{
                          display: "flex",
                          flex: 1,
                          marginRight: 20,
                        }}
                        color={
                          comment.comment_likes.filter(
                            (like) => like === user_details.user_id
                          ).length > 0
                            ? "error"
                            : ""
                        }
                        onClick={() => LikeComment(comment.comment_id)}>
                        {comment.comment_likes.length}
                      </FavoriteBorderIcon>
                    </CardContent>
                    <Divider variant='middle' />
                  </div>
                );
              })}
          </CardContent>
        )}
        {commentsButton && commentsButtonId === item.post_id && (
          <CardContent style={styles.formStyle}>
            <TextField
              // helperText='Tagged elected officials - Example: @israel israel @other person'
              id='standard-basic'
              // variant='standard'
              label='Add Comment'
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              // placeholder='add comment'
            />
            <Button variant='contained' onClick={() => addComment()}>
              Submit
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

DiscussionCard.deafult = {
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
};

export default DiscussionCard;
