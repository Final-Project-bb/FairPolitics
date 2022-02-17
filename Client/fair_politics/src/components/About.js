import React from 'react'
import Header from './Header';
const About = () => {
    return (
        <div>
            <Header title="About Page" />
            <div style={styles.text}>
                <div>Many times we see an imbalance between the issues that the elected offical focuses on</div>
                <div style={{position:'absolute',left:0,top:30}}>and the issues that the electorate wanted to focus on.</div>
                <div style={{position:'absolute',left:0,top:60}}>This case carries with it a problem of not fulfilling the will of the voters </div>
                <div style={{position:'absolute',left:0,top:90}}>so we decided to fix this by developing a system called Fair Politic that will help the</div>
                <div style={{position:'absolute',left:0,top:120}}> elected offical who wants to get feedback from his voter to know which issues to</div>
                <div style={{position:'absolute',left:0,top:150}}>focus on in order to divide his time more correctly.</div>
                <div style={{position:'absolute',left:0,top:180}}>We intend to build the feedback and implement Dynamic Proportional Rankings</div>
                <div style={{position:'absolute',left:0,top:210}}>algorithm feedback so that the results they get reflects the will of the voters.</div>
                <div style={{position:'absolute',left:0,top:240}}>This system will be conveniently and friendly to the electorate and elected</div>
                <div style={{position:'absolute',left:0,top:270}}>by unique identification, Including support for a variety of languages common to the population.</div>
            </div>
        </div>
    )
}

const styles = {
    head: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    title:{
        display: "flex",
        justifyContent: 'space-around',
        // flexDirection: 'row',
        // position: "relative",
        // marginLeft:10,
        fontSize:25,
        // top: 10,
        // right:150    
    },
    text:{
        display: "flex",
        // justifyContent: 'space-around',
        flexDirection: 'column',
        position: "relative",
        // marginLeft:10,
        top: 0,
        fontSize:25,
        left: 335,
    },
    cardFooter: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: "relative",
        // marginLeft:10,
        top:15,
        right: 20
    },
    likes: {
        position: "relative",
        right:105,
    },
    comment:{
        position: "relative",
        top: 20,
        // right:105,
    },
};

export default About
