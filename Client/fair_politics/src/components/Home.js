import React, { useEffect, useContext } from "react";
import Header from "./Header";
import DiscussionCard from "./DiscussionCard";
import FeedbackCard from "./FeedbackCard";
import { AppContext } from "./Context";

const Home = () => {
  const {
    user_details,
    setLoading,
    setFeedbackCards,
    setDiscussionCards,
    feedbackCards,
    discussionCards,
  } = useContext(AppContext);

  const fetchDiscussions = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/discussion_feed/${user_details.user_id}`
    );
    const data = await response.json();
    console.log("fetchDiscussions");
    console.log(data.allPostsWithComments);

    if (data != undefined) {
      await setDiscussionCards(data.allPostsWithComments);
    }
    setLoading(false);
  };

  const fetchPolls = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/poll_feed/${user_details.user_id}`
    );
    const data = await response.json();
    console.log(data.allPollsWithAnswer);
    console.log("fetchPolls");
    // console.log(data.allPollsWithAnswer);

    if (data !== undefined) {
      await setFeedbackCards(data.allPollsWithAnswer);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDiscussions();
    console.log("Home effected");
    fetchPolls();
  }, []);

  //   const FeedbackCards = [
  //     {
  //       FeedBack_id: 1,
  //       user_id: 1,
  //       title: "first feedback",
  //       Questions: [
  //         {
  //           Questions_id: 1,
  //           Questions_title: "are you agree?",
  //           answer: ["yes", "no", "not sure"],
  //         },
  //       ],
  //     },
  //     {
  //       FeedBack_id: 2,
  //       user_id: 1,
  //       title: "secound feedback",
  //       Questions: [
  //         {
  //           Questions_id: 1,
  //           Questions_title: "are you agree in this secound feedback?",
  //           answer: ["yes", "no", "not sure"],
  //         },
  //       ],
  //     },
  //   ];
  return (
    <div>
      {/* <a href=''>Login<a/> */}
      <Header title='Home Page' />
      <div style={styles.head}>
        <br />
        <div style={styles.card}>
          <div style={styles.title}>Discussions Card Side</div>
          {discussionCards.map((item) => {
            return <DiscussionCard item={item} />;
          })}
        </div>
        <div style={styles.card}>
          <div style={styles.title}>Feedbacks Card Side</div>
          {feedbackCards.map((item) => {
            return <FeedbackCard item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  head: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: 'whitesmoke'

    // color:"yellow",
    //       flex: 1,

    //       padding: 24,
    //       backgroundColor: "#eaeaea"
  },
  card: {
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
    // top: 100,
    // right:150
  },
};

export default Home;
