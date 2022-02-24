import React,{useState} from 'react'
const ProfileShowDetails = () => {
    const [picturePress, setPicturePress] = useState(false)
    const UserInfo = [
        {
            user_id: 1,
            FirstName: "Israel",
            LastName: "Israeli",
            Location: "Ramat-Gan",
            occupation: "Computer Science student",
            Picture: '../images/profilePicExmple.jpg',
            Age: 26,
            IsPublicelected: false
        }
    ];
    return (
        <div>
            <div style={styles.name}>
                {UserInfo[0].FirstName} {UserInfo[0].LastName}
            </div>
            <div style={styles.profileHead}>
            <img src={require('../images/profilePicExmple.jpg')} alt='logo'
                    style={{ borderRadius:picturePress?350:0, position: 'relative', left: 0 ,  height:picturePress?150:400 ,width:picturePress?150:400}}
                    onClickCapture={()=>setPicturePress(!picturePress)}
                />
                <div style={styles.semiDetails}>
                    <div>
                        age: {UserInfo[0].Age}
                    </div>
                    <div>
                        Location: {UserInfo[0].Location}
                    </div>
                    <div>
                        Occupation: {UserInfo[0].occupation}
                    </div>
                </div>
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
        top: -60,
        left: 130
    },
    profileHead:{
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: "absolute",
        left: -50,
        top:-70
    },
    semiDetails: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: "relative",
        left: 180,
        margin:0,
        top:-105
    },
};

export default ProfileShowDetails
