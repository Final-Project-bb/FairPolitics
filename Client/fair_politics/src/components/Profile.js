import React from 'react'
import { NavLink as Link } from "react-router-dom"
import Header from './Header';
import ProfileHeader from './ProfileHeader';
import ProfileShowDetails from './ProfileShowDetails';
import DiscussionCard from './DiscussionCard';
import FeedbackCard from './FeedbackCard';
import styled from 'styled-components';
const Profile = () => {
  return (
    <div>
      {/* <a href=''>Login<a/> */}
      <Header title="Profile Page" />
      <ProfileHeader />
      <div style={styles.card}>
        <DiscussionCard />
        <FeedbackCard />
      </div>
    </div>
    // </div >
  )
}

const styles = {
  order: {
    flexDirection: 'row',
  },
  card: {
    display: "flex",
    justifyContent: 'space-around',
    flexDirection: 'row',
    // color:"yellow",
    //       flex: 1,

    //       padding: 24,
    //       backgroundColor: "#eaeaea"
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
  },
  profileHead: {
    display: "flex",
    position: "relative",
    top: 10,
    justifyContent: 'space-around',
    flexDirection: 'column',
    margin: 50,

  },
  addDisButton: {
    display: "flex",
    position: "absolute",
    top: 110,
    left: 180,
    fontSize: 20,
    textDecoration: 'none',
    color: "red",
    fontWeight: "bold",
    // justifyContent: 'space-around',
  },
  addFeedButton: {
    display: "flex",
    position: "absolute",
    top: 110,
    left: 350,
    fontSize: 20,
    textDecoration: 'none',
    color: "red",
    fontWeight: "bold",
    // justifyContent: 'space-around',
  },
  profileBody: {
    // display: "flex",
    // position: "absolute",
    // top: 110,
    // left:180,
    // backgroundColor:"red",
    // height:150,
    // left:0,
    // top:0,
    // // margin:100,
  },
};
const NavLinkAbout = styled(Link)`
  color: #fff;
   ${'' /* justify-content: space-between; */}
   flex-direction:row;
   color:white;
   font-weight:bold;
   display: flex;
   align-items: center;
   position: absolute;
  left:50px; 
  ${'' /* fontSize:30px; */}
  ${'' /* size:30px; */}
  text-decoration: none;
  ${'' /* margin-left: 30px; */}
  top:-100px;
  ${'' /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;  
  &:hover {
  color: green;
  }
  &.active {
    color: #15cdfc; 
  }
`;
const NavLinkDis = styled(Link)`
  color: #fff;
   ${'' /* justify-content: space-between; */}
   flex-direction:row;
   color:white;
   font-weight:bold;
   display: flex;
   align-items: center;
   position: absolute;
  left:140px; 
  ${'' /* fontSize:30px; */}
  ${'' /* size:30px; */}
  text-decoration: none;
  ${'' /* margin-left: 30px; */}
  top:-100px;
  ${'' /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;  
  &:hover {
  color: green;
  }
  &.active {
    color: #15cdfc; 
  }
`;
const NavLinkFeed = styled(Link)`
  color: #fff;
   ${'' /* justify-content: space-between; */}
   flex-direction:row;
   color:white;
   font-weight:bold;
   display: flex;
   align-items: center;
   position: absolute;
  left:270px; 
  ${'' /* fontSize:30px; */}
  ${'' /* size:30px; */}
  text-decoration: none;
  ${'' /* margin-left: 30px; */}
  top:-100px;
  ${'' /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;  
  &:hover {
  color: green;
  }
  &.active {
    color: #15cdfc; 
  }
`;
export default Profile
