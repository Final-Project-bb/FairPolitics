import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
const FeedbackCard = ({ item, inProfile }) => {
  const [commentsButtonId, setCommentsButtonId] = useState(0);
  const [commentsButton, setCommentsButton] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [height, setHeight] = useState(0);
  const [question, setQuestion] = useState("");
  const [picture, setPicture] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answers, setAnswers] = useState([]);
  const [description, setDescription] = useState("");

  const { user_details, setLoading, feedbackCards, setFeedbackCards } =
    useContext(AppContext);

  const CommentsButton = (item) => {
    // setCommentsButtonId(item.Discussion_id)
    // if(commentsButton)
    // {
    //     setCommentsButton(!commentsButton);
    //     setHeight(0)
    // }
    // else{
    //     setCommentsButton(!commentsButton);
    //     setHeight(item.Comments.length*30)
    // }
  };
  const LikeDiscussion = (userId, discussionId) => {
    let handleDis = feedbackCards.filter((a) => a.FeedBack_id === discussionId);
    if (handleDis.Likes < 1) {
      handleDis.Likes.push(userId);
    }
    // setCommentsButtonId()
    // setCommentsButton(!commentsButton);
  };
  const addAnswer = () => {};

  const ClickEditPoll = (e) => {
    alert("edit Click!");
    setOnEdit(!onEdit);
  };
  const updateFeedbackSubmit = async (e) => {
    // setOnEdit(false);
    setOnEdit(!onEdit);

    alert("edit updated!");
  };
  const deletePoll = async (e) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this account?")) {
      await fetch(
        `http://localhost:4000/api/delete_poll/${item.poll_id}`,
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
      <div>
        {!onEdit && (
          <PollCard
            key={item.poll_id}
            style={{ height: (item.description.length / 2.5) * 40 + height }}>
            {inProfile && (
              <div>
                <FaRegEdit onClick={(e) => ClickEditPoll(e)} />
                <FaTrashAlt onClick={(e) => deletePoll(e)} />
              </div>
            )}
            <div style={styles.title}>
              {item.poll_id} {item.title}{" "}
            </div>

            <div style={styles.description}>{item.description}</div>
            <div style={styles.cardFooter}>
              <form>
                <div style={styles.question}>
                  {item.answers.map((answer) => (
                    <div key={answer.answer_id}>
                      {answer.title}
                      <div>
                        <label>
                          <input type='checkbox' />
                          {answer.answer}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => addAnswer(item)}>submit!</button>
              </form>
            </div>
          </PollCard>
        )}
        {onEdit && (
          <div>
            Edit {item.poll_id} {item.title} poll
            <RegisterFormStyle>
              <form onSubmit={(e) => updateFeedbackSubmit(e)}>
                <label>title of the question:</label>
                <input
                  type='text'
                  // pattern="[@]{1}[a-z][a-z]"
                  // required
                  placeholder='valid tags format!'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <br />
                {/* <small>@name1 @name2... requird Exmple:@israel israel @other person</small><br /> */}
                {/* <label>how many answer?</label>
                <input
                    type="number"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid number!'
                    value={answerNum}
                    onChange={(e) => setAnswerNum(e.target.value)}
                /><br /> */}
                <label>answer #1</label>
                <input
                  type='text'
                  // pattern="[@]{1}[a-z][a-z]"
                  // required
                  placeholder='a valid answer!'
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <br />
                <label>answer #2</label>
                <input
                  type='text'
                  // pattern="[@]{1}[a-z][a-z]"
                  // required
                  placeholder='a valid answer!'
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <br />
                <label>answer #3</label>
                <input
                  type='text'
                  // pattern="[@]{1}[a-z][a-z]"
                  // required
                  placeholder='a valid answer!'
                  value={answer3}
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <br />

                <label>write a description of the feedback:</label>
                <input
                  type='text'
                  // pattern="[@]{1}[a-z][a-z]"
                  // required
                  multiline
                  placeholder='valid description!'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label>enter a picture:</label>
                <input
                  type='text'
                  // pattern="[@]{1}[a-z][a-z]"
                  // required
                  placeholder='valid picture!'
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                />
                <br />
                <input type='submit' />
              </form>
            </RegisterFormStyle>
          </div>
        )}
      </div>
    </div>
  );
};
FeedbackCard.deafult = {
  inProfile: false,
};
const styles = {
  head: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    justifyContent: "space-around",
    // flexDirection: 'row',
    // position: "relative",
    // marginLeft:10,
    fontSize: 25,
    // top: 10,
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
  question: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "colmun",
    position: "relative",
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

const PollCard = styled.div`
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
  ${"" /* opacity: 0.8; */}
  background: transparent linear-gradient(180deg,#025fdb 0%,#025fdb 35%,#0b3668 100%) 0% 0% no-repeat padding-box;
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
const RegisterFormStyle = styled.div`
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
  height: 200px;
  width: 500px;
  position: absolute;
  left: 850px;
  top: 390px;
  border-radius: 30px;
  ${"" /* display: flex; */}
  flex-direction:row;
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
${"" /* z-index: 10; */} /* Third Nav */
/* justify-content: flex-start; */
`;

export default FeedbackCard;
