import React, { useContext } from "react";
import ProfileShowDetails from "./ProfileShowDetails";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./Context";


const ProfileHeader = () => {
  const { inFriend, friend_details } = useContext(AppContext);
  const friendPath = `/FriendProfile`;

  return (
    <div style={styles.order}>
      <ProfileShowDetails />
    </div>
  );
};
// ProfileHeader.deafult = {
//   inFriend: false,
// };

const styles = {
  order: {
    flexDirection: "row",
    position: "relative",
    // left: 22,
    backgroundColor: 'whitesmoke',
    justifyContent: 'space-around',
  },

  profileHead: {
    display: "flex",
    position: "relative",
    top: 10,
    // justifyContent: "space-around",
    flexDirection: "column",
    // margin: 85,
  },
};
const NavLinkAbout = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-80px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: grey;
  }
  &.active {
    color: dodgerblue;
  }
`;
const NavLinkDis = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 140px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-80px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: grey;
  }
  &.active {
    color: dodgerblue;
  }
`;
const NavLinkFeed = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 270px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-80px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: grey;
  }
  &.active {
    color: dodgerblue;
  }
`;
const NavLinkMyProfile = styled(Link)`
  color: #fff;
  ${"" /* justify-content: space-between; */}
  flex-direction:row;
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: absolute;
  left: 140px;
  ${"" /* fontSize:30px; */}
  ${"" /* size:30px; */}
  text-decoration: none;
  ${"" /* margin-left: 30px; */}
  top:-80px;
  ${"" /* padding: 0 0.1rem; */}
  height: 100%;
  cursor: pointer;
  &:hover {
    color: grey;
  }
  &.active {
    color: dodgerblue;
  }
`;
export default ProfileHeader;
