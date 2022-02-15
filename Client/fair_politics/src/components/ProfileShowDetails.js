import React from 'react'
const ProfileShowDetails = () => {
    const UserInfo = [
        {
            user_id: 1,
            FirstName: "Tal",
            LastName: "Schreiber",
            Location: "Ramat-gan",
            occupation: "Computer Science student",
            Picture: "Tal.jpeg",
            Age: 24,
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
                    style={{ borderRadius: 300, position: 'relative', left: 0 ,  height: 150 ,width: 150}}
                    // onClickCapture={handleClick}
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
            {/* image profile will be here
            about and more.. */}
            <button> more info</button>
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
        top: 150,
        left: 150
    },
    profileHead:{
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: "absolute",
        left: 10,
    },
    semiDetails: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: "absolute",
        left: 200,
        margin:20,
        top:0
    },
};

export default ProfileShowDetails
