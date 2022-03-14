import React from 'react'
import ProfileShowDetails from './ProfileShowDetails';
import { NavLink as Link } from "react-router-dom"
import styled from 'styled-components';
const ProfileHeader = ({inFriend}) => {
  return (
    <div style={styles.order}>
      <div style={styles.profileHead}>
        <ProfileShowDetails inFriend={inFriend} />
        <NavLinkDis to='/profile/addDiscussion'>Add Discussion</NavLinkDis>
        <NavLinkFeed to='/profile/addFeedback'>Add Feedback</NavLinkFeed>
        <NavLinkAbout to='/profile/aboutProfile'>About Me</NavLinkAbout>
      </div>
    </div>
  )
}
ProfileHeader.deafult = {
  inFriend: false,
};

const styles = {
  order: {
    flexDirection: 'row',
  },
  card: {
    display: "flex",
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  head: {
    flex: 1,

    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    flexDirection: 'row',
    paddingVertical: 8,
    padding: 20,
    textDecoration: 'none',
    borderWidth: 4,
    borderColor: "#20232a",
    backgroundColor: "#61dafb",
    color: "#20232a",
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
  },
  profileBody: {
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
  top:-80px;
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
  top:-80px;
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
  top:-80px;
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
export default ProfileHeader
