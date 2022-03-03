import React, { useState,useContext } from 'react'
import { AppContext } from './Context';

const ProfileShowDetails = () => {
    const [picturePress, setPicturePress] = useState(false)
    const { user_details, setIsConnected } = useContext(AppContext);
    
    // 
    // const user_details = 
    // {
    //     user_id: "1",
    //     first_name: "Israel",
    //     last_name: "Israeli",
    //     city: "Ramat gan",
    //     birthdate: "26/04/1995",
    //     job_title: "Computer Science student",
    //     description: "king",
    ////     semi_description: "semi_description",
    //     profile_picture: "../images/profilePicExmple.jpg",
    //     gender: "male",
    ////     age: 26,
    ////     is_public_elected: false
    // };
    return (
        <div>

            <div style={styles.semiDetails}>
                <div style={styles.name}>
                    {user_details.first_name} {user_details.last_name}
                </div>
                <div>
                    {user_details.gender} , {user_details.age}
                </div>
                <div>
                    Working it: {user_details.job_title} living in {user_details.city}
                </div>
                <div>
                    {user_details.semi_description}
                </div>
            </div>
            <div style={styles.profileHead}>
                <img src={require('../images/profilePicExmple.jpg')} alt='logo'
                    style={{ borderRadius: !picturePress ? 350 : 0, position: !picturePress ? 'relative' : "absolute", left: 0, height: !picturePress ? 150 : 400, width: !picturePress ? 150 : 400 }}
                    onClickCapture={() => setPicturePress(!picturePress)}
                />

            </div>
            {/* image profile will be here */}
            {/* about and more..  */}
            {/* <button style={styles.info}> more info</button> */}
        </div>
    )
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
        left: -10
    },
    profileHead: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: "absolute",
        left: -50,
        top: -70
    },
    semiDetails: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: "absolute",
        left: 150,
        margin: 0,
        top: -25
    },
};

export default ProfileShowDetails
