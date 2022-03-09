import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { AppContext } from "./Context";

const UserCard = ({ user_info, inFollowing, inSearch }) => {
  const { setFollowerDetails, setFollowingDetails, setFollowers, setFollowings, user_details, loading, setLoading, followings, followers } =
    useContext(AppContext);
  const history = useHistory();

  const [picturePress, setPicturePress] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [flag, setFlag] = useState(true);

  // const flag= true;
  useEffect(() => {
    fetchFollow();
    let following_ids = followings.map((user) => user.user_following_id);
    fetchUserDetailsById(following_ids, true)
    const checkFollow = () => {
      let followState = false;
      followState = followings
        .map((user) => user.user_following_id)
        .every((id) => id == user_info.user_id);
      setIsFollow(followState);
      if (followings.length === 0) {
        setIsFollow(false);
        if (inFollowing) {
          setFlag(false);
        }
      }
      else {
        if (inFollowing) {
          if (followState) {
            setFlag(true);
          }
          else {
            setFlag(false);
          }
        }
      }
    };
    checkFollow();

  }, [flag, isFollow]);
  // here should add and remove follow from db.
  const followUser = (e) => {
    // e.preventDefault();
    setLoading(true);

    if (isFollow) {
      // remove follow from db and update the usestate
      removeFollowDb();
    } else {
      // add follow to db and update the usestate
      addFollowDb();
      // setIsFollow(!isFollow);
    }
    if (inFollowing) {
      history.push("/profile/follower");
      history.push("/profile/following");
    }
    else {
      if (inSearch) {
        history.push("/profile/following");
        history.push("/search");
      } else {
        history.push("/profile/following");
        history.push("/profile/follower");
      }
    }
    setIsFollow(!isFollow);
    setLoading(false);

    //here should be following
  };
  const fetchFollow = async () => {
    const response = await fetch(`http://localhost:4000/api/get_follow/${user_details.user_id}`);
    const data = await response.json();
    // console.log(data);
    await setFollowings(data.following);
    await setFollowers(data.follower);
  }

  const fetchUserDetailsById = async (ids, isFollowing) => {
    if (ids.length === 0) {
      return;
    }
    const response = await fetch("http://localhost:4000/api/get_users_by_ids", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    if (isFollowing) {
      await setFollowingDetails(data.result);
      // console.log(data.result);
    } else {
      await setFollowerDetails(data.result);
      // console.log(data.result);
    }
  };
  const addFollowDb = async () => {
    const ids = {
      user_id: user_details.user_id,
      user_following_id: user_info.user_id,
    };
    const response = await fetch("http://localhost:4000/api/add_following", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    console.log(data);
  };
  const removeFollowDb = async () => {
    const ids = {
      user_id: user_details.user_id,
      user_following_id: user_info.user_id,
    };
    const response = await fetch("http://localhost:4000/api/remove_following", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      {flag &&
        <UserCardStyle>
          <div style={styles.all}>
            <div style={styles.semiDetails}>
              <div style={styles.name}>
                {user_info.first_name} {user_info.last_name}
              </div>
              <div>
                {user_info.gender} , {user_info.age}
              </div>
              <div>
                Working it: {user_info.job_title} living in {user_info.city}
              </div>
              <div>{user_info.semi_description}</div>
              <button onClick={() => console.log(`is follow: ${isFollow} ${user_info.user_id}`)}>here</button>
            </div>
            <div style={styles.profileHead}>
              <img
                src={require("../images/profilePicExmple.jpg")}
                alt='logo'
                style={{
                  borderRadius: !picturePress ? 350 : 0,
                  position: !picturePress ? "relative" : "absolute",
                  left: 20,
                  height: !picturePress ? 50 : 200,
                  width: !picturePress ? 50 : 200,
                }}
                onClickCapture={() => {
                  setPicturePress(!picturePress);
                }}
              />
            </div>
          </div>
          <button style={styles.follow} onClick={(e) => followUser(e)}>
            {isFollow ? "unfollow" : "follow"}!
          </button>
        </UserCardStyle>
      }
    </div>
  );
};
UserCard.defaultProps = {
  inFollowing: false,
  inSearch: false,
}
const styles = {
  name: {
    display: "flex",
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    position: "absolute",
    // marginLeft:10,
    fontSize: 25,
    top: -30,
    left: -10,
  },
  all: {
    // display: "flex",
    position: "relative",
    top: 50,
    left: 125,
  },
  profileHead: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "absolute",
    left: -150,
    top: -40,
  },
  semiDetails: {
    display: "flex",
    // justifyContent: "space-around",
    flexDirection: "column",
    position: "absolute",
    left: -50,
    height: 20,
    // margin: -15,
    fontSize: 15,
    top: 10,
  },
  follow: {
    display: "flex",
    // justifyContent: 'space-around',
    // flexDirection: 'column',
    position: "absolute",
    margin: 0,
    left: 430,
    top: 10,
  },
};
const UserCardStyle = styled.div`
  padding-left: 1rem;
  background: transparent
    linear-gradient(150deg, #025fdb 0%, #025fdb 35%, #0b3668 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
  height: 200px;
  width: 500px;
  position: relative;
  top: 20px;
  left: 0px;
  ${"" /* buttom:500px; */}
  margin-top:20px;
  ${"" /* justify-content: space-around; */}
  ${"" /* left:-150px; */}
  border-radius:30px;
  display: flex;
  flex-direction: column;
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
  ${"" /* z-index: 10; */} /* Third Nav */
  /* justify-content: flex-start; */
`;

export default UserCard;
