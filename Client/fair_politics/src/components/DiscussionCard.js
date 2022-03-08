import React, { useState, useEffect,useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
const DiscussionCard = () => {
  const [commentsButtonId, setCommentsButtonId] = useState(0);
  const [commentsButton, setCommentsButton] = useState(false);
  const [height, setHeight] = useState(0);
//   const [discussionCards, setDiscussionCards] = useState([]);
  const { user_details, setLoading, discussionCards, setDiscussionCards } = useContext(AppContext);

//   const fetchDiscussions = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const response = await fetch(`http://localhost:4000/api/get_discussion/${user_details.user_id}`);
//     const data = await response.json();
//     console.log(data.result);

//     if (data.result[0] != undefined) {
//       setDiscussionCards(data.result);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchDiscussions();
// }, []);
  

  const discussionCardss = [
    {
      post_id: 1,
      owner_id: 1,
      title: "first discussion",
      description: "my first discussion Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      Comments: [
        {
          Comment_id: 1,
          user_id: 2,
          Comment_title: "great first discussion!",
        },
      ],
      Likes: [
        {
          user_id: 2,
        },
      ],
    },
    {
      post_id: 2,
      owner_id: 1,
      title: "secound discussion",
      description: "my secound discussion Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      Comments: [
        {
          Comment_id: 1,
          user_id: 2,
          Comment_title: "great secound discussion!",
        },
        {
          Comment_id: 1,
          user_id: 2,
          Comment_title: "great secound discussion2!",
        },
      ],
      Likes: [
        {
          user_id: 2,
        },
        {
          user_id: 1,
        },
      ],
    },
  ];
  const CommentsButton = (item) => {
    setCommentsButtonId(item.Discussion_id);
    if (commentsButton) {
      setCommentsButton(!commentsButton);
      setHeight(0);
    } else {
      setCommentsButton(!commentsButton);
      setHeight(item.Comments.length * 30);
    }
  };
  const LikeDiscussion = (userId, discussionId) => {
    let handleDis = discussionCards.filter(
      (a) => a.Discussion_id === discussionId
    );
    if (handleDis.Likes < 1) {
      handleDis.Likes.push(userId);
    }
    // setCommentsButtonId()
    // setCommentsButton(!commentsButton);
  };
  return (
    <div style={styles.head}>
      <div style={styles.title}>Discussion Card Side</div>
      {/* {DiscussionCards[0].title} */}

      {discussionCardss.map((item) => (
        <DisCard
          key={item.post_id}
          style={{ height: (item.description.length / 70) * 32 + height + 35 }}>
          <div style={styles.title}>
            {item.post_id} {item.title}{" "}
          </div>
          <div style={styles.text}>{item.description}</div>
          <div style={styles.cardFooter}>
            <button onClick={() => CommentsButton(item)}>Show Comments!</button>
            <button onClick={() => LikeDiscussion(1, item.post_id)}>
              Like!
            </button>
            <div style={styles.likes}>{item.Likes.length}</div>
          </div>
          {commentsButton && commentsButtonId === item.Discussion_id && (
            <div>
              {item.Comments.map((comment) => (
                <div key={comment.Comment_id} style={styles.comment}>
                  {comment.Comment_title}
                </div>
              ))}
            </div>
          )}
          <form
            // onSubmit={onSearch}
            style={styles.formStyle}>
            {/* <label onClick={onSearch}>Search:</label> */}
            <input
              // onKeyDown={handleKeyDown(onSearch)}
              style={{
                height: "20px",
                width: "150px",
                position: "relative",
                top: "22px",
                borderRadius: 70,
              }}
              type='text'
              placeholder='add comment'
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
            />

            {/* <input type="submit" style={{ color: "white", backgroundColor: "black" }} /> */}
          </form>
        </DisCard>
      ))}
    </div>
  );
};

const styles = {
  head: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
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
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "colmun",
    position: "relative",
    // marginLeft:10,
    top: 10,
    left: -15,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    position: "relative",
    // marginLeft:10,
    top: 15,
    right: 20,
  },
  likes: {
    position: "relative",
    right: 105,
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
