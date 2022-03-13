import React, { useState, useContext } from "react";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import { useHistory } from "react-router-dom";
import { AppContext } from "./Context";
import styled from "styled-components";
import Loading from "./Loading";

const AboutMe = () => {
  const { user_details, setUserDetails, setIsConnected, loading, setLoading } =
    useContext(AppContext);

  const [first_name, setFirstName] = useState(user_details.first_name);
  const [last_name, setLastName] = useState(user_details.last_name);
  const [city, setCity] = useState(user_details.city);
  const [job_title, setJobTitle] = useState(user_details.job_title);
  const [date, setDate] = useState(user_details.birthdate);
  const [profile_picture, setProfilePicture] = useState(user_details.profile_picture);
  const [gender, setGender] = useState(user_details.gender);
  const [description, setDescription] = useState(user_details.description);
  const [semi_description, setSemiDescription] = useState(user_details.semi_description);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const current = new Date().toISOString().split("T")[0];
  const history = useHistory();

  // const user_details =
  // {
  //     user_id: "1",
  //     first_name: "Israel",
  //     last_name: "Israeli",
  //     city: "Ramat gan",
  //     birthdate: "26/04/1995",
  //     job_title: "Computer Science student",
  //     description: "king",
  //     semi_description: "semi_description",
  //     profile_picture: "../images/profilePicExmple.jpg",
  //     gender: "male",
  //     age: 26,
  // };

  const editButton = () => {
    setOnDelete(false);
    setOnEdit(!onEdit);
  };

  const editSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const new_user_details = {
      user_id: user_details.user_id,
      first_name: first_name,
      last_name: last_name,
      city: city,
      birthdate: date,
      age: user_details.age,
      job_title: job_title,
      description: description,
      semi_description: semi_description,
      profile_picture: profile_picture,
      gender: gender,
      is_public_elected: user_details.is_public_elected,
    };
    setUserDetails(new_user_details);
    editUserDb(new_user_details);
    setLoading(false);
    setOnEdit(false);
  };

  const editUserDb = async (new_user_details) => {
    await fetch(
      `http://localhost:4000/api/update_user`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_user_details),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => console.error(error));
  };

  // work but doesn't delete from login_deteils table
  const deleteUser = () => {
    setOnEdit(false);
    setOnDelete(!onDelete);
    if (window.confirm("Are you sure you want to delete this account?")) {
      setLoading(true);
      deletefromDb();
      history.push("/about");
      setIsConnected(false);
    }
    setOnDelete(false);
    setLoading(false);
  };
  // work but doesn't delete from login_deteils table
  const deletefromDb = async () => {
    await fetch(
      `http://localhost:4000/api/delete_user/${user_details.user_id}`,
      {
        method: "DELETE",
      }
    ).catch((error) => console.error(error));
  };

  return (
    <div>
      <Header title='About Me' />
      {!loading && (
        <div>
          <ProfileHeader />
          {/* about and more..  */}
          <button style={styles.edit_info} onClick={() => editButton()}>
            {" "}
            {onEdit ? "Cancle info" : "Edit info"}
          </button>
          <button style={styles.delete_user} onClick={() => deleteUser()}>
            {" "}
            {onDelete ? "Cancle Delete" : "Delete account?"}
          </button>
          {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel() } } /> */}
          {onEdit && (
            <RegisterFormStyle>
              <form onSubmit={(e) => editSubmit(e)}>
                <label>Enter your first name:</label>
                <input
                  type='text'
                  // pattern="[0]{1}[5]{1}[0-9]{8}"
                  // required
                  placeholder='first name!'
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <label>Enter your last name:</label>
                <input
                  type='text'
                  // pattern="[0]{1}[5]{1}[0-9]{8}"
                  // required
                  placeholder='last name!'
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <div>
                  <input
                    name='gender'
                    type='radio'
                    value={gender}
                    onClick={() => setGender("Male")}
                  />
                  <label>Male</label>
                  <input
                    name='gender'
                    type='radio'
                    value={gender}
                    onClick={() => setGender("Female")}
                  />
                  <label>Female</label>
                </div>
                <label>Enter your Birth Of Date:</label>
                <input
                  type='date'
                  placeholder='Enter BirthDate'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  name='birthdate'
                  max={current}
                />
                <br />
                <label>Enter your semi-description:</label>
                <input
                  type='text'
                  placeholder='semi describe yourself!'
                  value={semi_description}
                  onChange={(e) => setSemiDescription(e.target.value)}
                />
                <br />
                <label>Enter your description:</label>
                <input
                  type='text'
                  placeholder='describe yourself!'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label>Enter your location:</label>
                <input
                  type='text'
                  // pattern="[0]{1}[5]{1}[0-9]{8}"
                  // required
                  placeholder='location!'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <br />
                <label>Enter your rule:</label>
                <input
                  type='text'
                  // pattern="[0]{1}[5]{1}[0-9]{8}"
                  // required
                  placeholder='Rule!'
                  value={job_title}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <br />
                <label>Insert your Profile's picture:</label>
                <input
                  type='text'
                  // pattern="[0]{1}[5]{1}[0-9]{8}"
                  // required
                  placeholder='Picture!'
                  value={profile_picture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
                <br />
                <input type='submit' />
              </form>
            </RegisterFormStyle>
          )}

          {!onEdit && (
            <div style={styles.description}>{user_details.description}</div>
          )}
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

const styles = {
  edit_info: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "relative",
    left: 180,
    margin: 0,
    top: 10,
  },
  delete_user: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "relative",
    left: 180,
    margin: 0,
    top: 10,
    color: "red",
  },
  description: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "relative",
    left: 280,
    margin: 0,
    top: 20,
  },
};

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
  height: 300px;
  width: 500px;
  position: absolute;
  left: 550px;
  border-radius: 30px;
  ${"" /* display: flex; */}
  flex-direction:row;
  ${"" /* justify-content: space-between; */}
  ${"" /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
${"" /* z-index: 10; */} /* Third Nav */
/* justify-content: flex-start; */
`;

export default AboutMe;
