import React from 'react'
import { NavLink } from "react-router-dom"
import Header from './Header';
import ProfileShowDetails from './ProfileShowDetails';
import DiscussionCard from './DiscussionCard';
import FeedbackCard from './FeedbackCard';
const Profile = () => {
  return (
    <div>
      {/* <a href=''>Login<a/> */}
      <Header title="Profile Page" />
      <ProfileShowDetails/>
      <div style={styles.order}>
      <NavLink to='/profile/addDiscussion' className={"addDiscussionLink"}>Add Discussion</NavLink><br/>
      <NavLink to='/profile/addFeedback' className={"addFeedbackLink"}>Add Feedback</NavLink>
        <DiscussionCard />
        <FeedbackCard />
      </div>
    </div>
  )
}

const styles = {
  order: {
    flexDirection: 'row',
  },
  head: {
    // color:"yellow",
    flex: 1,

    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    //   marginTop: 0,
    paddingVertical: 8,
    padding: 20,
    textDecoration: 'none',
    borderWidth: 4,
    borderColor: "#20232a",
    //   borderRadius: 0,
    backgroundColor: "#61dafb",
    color: "#20232a",
    //   textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
};


export default Profile
