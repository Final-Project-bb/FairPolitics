import React from 'react'
import Header from './Header';
import ReactLoading from "react-loading"
const Loading = () => {
    return (
        <div >
            <div style={styles.head}>
                <ReactLoading type='spinningBubbles' color='green' height={300} width={300}></ReactLoading>
            </div>
            <div style={styles.text}>
                loading...
            </div>
        </div>
    )
}

const styles = {
    head: {
        // display: "flex",
        // justifyContent: 'space-around',
        // flexDirection: 'column',
        position: "absolute",
        // marginLeft:10,
        top: 290,
        fontSize: 25,
        left: 605,
    },
    text: {
        position: "absolute",
        // marginLeft:10,
        top: 410,
        fontSize: 45,
        left: 670,
    },
};

export default Loading
