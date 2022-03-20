import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";

const DiscussionCard = ({ item, inProfile }) => {
  const [commentsButtonId, setCommentsButtonId] = useState(0);
  const [commentsButton, setCommentsButton] = useState(false);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState("");
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [commentsEditButtonId, setCommentsEditButtonId] = useState(0);

  // const [height, setHeight] = useState(0);
  // const [onEdit, setOnEdit] = useState(false);

  const {
    user_details,
    setLoading,
    discussionCards,
    setCurrentItem,
    currentItem,
  } = useContext(AppContext);

  const history = useHistory();

  const CommentsButton = (item) => {
    setCommentsButtonId(item.post_id);
    if (commentsButton) {
      setCommentsButton(!commentsButton);
      // setHeight(0);
    } else {
      setCommentsButton(!commentsButton);
      // setHeight(item.comments.length * 30);
    }
  };

  const LikeDiscussion = async () => {
    const details = {
      post_id: item.post_id,
      user_id: user_details.user_id,
    };
    console.log(details);
    await fetch(`http://localhost:4000/api/add_like_to_discussion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };

  const addComment = async (e) => {
    console.log(comment);
    const comment_details = {
      post_id: item.post_id,
      user_id: user_details.user_id,
      comment: comment,
    };
    console.log(comment_details);
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

  const editComment = async (e, comment_id) => {
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

  const deleteComment = async (e, comment_id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await fetch(`http://localhost:4000/api/delete_comment/${comment_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
      setComment("");
    }
  };

  const editDiscussion = (e) => {
    setCurrentItem(item);
    history.push("/profile/editDiscussion");
  };

  const deleteDiscussion = async (e) => {
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
      <Card style={{ height: 1000, width: 600 }}>
        {inProfile && (
          <CardContent>
            <FaRegEdit onClick={(e) => editDiscussion(e)} />
            <FaTrashAlt onClick={(e) => deleteDiscussion(e)} />
          </CardContent>
        )}
        <CardContent style={styles.title}>
          {item.post_id} {item.title}{" "}
        </CardContent>
        <CardContent style={styles.text}>{item.description}</CardContent>
        <CardContent style={styles.cardFooter}>
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              onClick={() => CommentsButton(item)}>
              Show Comments!
            </Button>
            <CardContent>
              {item.comments[0].comment_id !== null ? item.comments.length : 0}
            </CardContent>
            <Button
              variant='contained'
              color='primary'
              onClick={() => LikeDiscussion()}>
              Like!
            </Button>
          </CardActions>
          <CardContent style={styles.likes}>{item.likes.length}</CardContent>
        </CardContent>
        {commentsButton && commentsButtonId === item.post_id && (
          <CardContent>
            {item.comments.map((comment) => {
              return (
                <div key={comment.comment_id} style={styles.comment}>
                  {comment.comment}
                  {comment.user_id_comment === user_details.user_id && (
                    <>
                      <FaRegEdit
                        onClick={(e) => {
                          setEditCommentForm(!editCommentForm);
                          setCommentsEditButtonId(comment.comment_id);
                          setCommentEdit(comment.comment);
                        }}
                      />
                      <FaTrashAlt
                        onClick={(e) => deleteComment(e, comment.comment_id)}
                      />
                      {editCommentForm &&
                        commentsEditButtonId === comment.comment_id && (
                          <CardContent style={styles.formStyle}>
                            <TextField
                              // helperText='Tagged elected officials - Example: @israel israel @other person'
                              id='standard-basic'
                              // variant='standard'
                              label='Update Comment'
                              type='text'
                              value={commentEdit}
                              onChange={(e) => setCommentEdit(e.target.value)}
                              // placeholder='add comment'
                            />
                            <Button
                              variant='contained'
                              onClick={(e) =>
                                editComment(e, comment.comment_id)
                              }>
                              Submit
                            </Button>
                          </CardContent>
                        )}
                    </>
                  )}
                </div>
              );
            })}
          </CardContent>
        )}
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
          <Button variant='contained' onClick={(e) => addComment()}>
            Submit
          </Button>
        </CardContent>
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
  head: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    marginBottom: 30,
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
  comment: {
    // position: "relative",
    // top: 20,
    // // right:105,
  },
};

export default DiscussionCard;
