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
      comment: comment
    };
    console.log(comment_details);
    await fetch(`http://localhost:4000/api/add_like_to_discussion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment_details),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
    setComment('');
  };

  const deleteComment = async (e) => {
    // const comment_details = {
    //   post_id: item.post_id,
    //   user_id: user_details.user_id,
    //   comment: comment
    // };
    // console.log(comment_details);
    await fetch(`http://localhost:4000/api/delete_comment/:comment_id`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
    setComment('');
  };

  const editDiscussion = (e) => {
    setCurrentItem(item);
    history.push("/profile/editDiscussion");
  };

  const deleteDiscussion = async (e) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this account?")) {
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
      <Card style={{ height: 400, width: 600 }}>
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
            {item.comments.map((comment) => (
              <div key={comment.comment_id} style={styles.comment}>
                {comment.comment}
              </div>
            ))}
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
    position: "relative",
    top: 20,
    // right:105,
  },
};

const DisCard = styled.div`
  ${
    "" /* background: linear-gradient(135deg, rgb(11,15,67) 5%,rgb(27,100,221) ); */
  }
  ${"" /* width: 14px; */}
  ${"" /* height: 24px; */}
  ${
    "" /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */
  }
 ${"" /* background-position: 50% 50%; */}
 ${"" /* background-repeat: no-repeat; */}
  padding-left: 2rem;
  background: transparent
    linear-gradient(150deg, #025fdb 0%, #025fdb 35%, #0b3668 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
  height: 300px;
  width: 500px;
  margin: 10px;
  ${"" /* position:absolute; */}
  ${"" /* left:250px; */}
  border-radius:30px;
  ${"" /* display: flex; */}
  ${"" /* flex-direction:row; */}
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
  ${"" /* z-index: 10; */} /* Third Nav */
  /* justify-content: flex-start; */
`;

export default DiscussionCard;
