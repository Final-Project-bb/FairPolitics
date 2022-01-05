import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Header from './Header';
const AddFeedback = () => {
    const [question, setQuestion] = useState()
    const [pictures, setPictures] = useState()
    const [answers, setAnswers] = useState([])
    const [description, setDescriptionture] = useState()
    const history = useHistory();

    const handleClick = () => {
        history.push("/profile");
    }

    const addFeedbackSubmit = (event) => {
        event.preventDefault();
        // setTempPassFromDB("1225") // here should get the temp pass from server
        alert(`Add feedback submit works!`) // here should send pass to phone in sms
        handleClick();
        // if(tempPassFromDB===tempPass){
        //     alert(`Password approved`)
        // }
        // else{
        //     alert(`Password failed`)    
        // }
    }
    return (
        <div>
            <Header title="Add Feedback page" />
            <form onSubmit={addFeedbackSubmit}>
                <label>title of the question:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='valid tags format!'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                /><br />
                {/* <small>@name1 @name2... requird Exmple:@israel israel @other person</small><br /> */}
                {/* <label>how many answer?</label>
                <input
                    type="number"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid number!'
                    value={answerNum}
                    onChange={(e) => setAnswerNum(e.target.value)}
                /><br /> */}
                <label>answer #1</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid answer!'
                    // value={answerNum}
                    onChange={(e) => answers.push(e.target.value)}
                /><br />
                <label>answer #2</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid answer!'
                    // value={answerNum}
                    onChange={(e) => answers.push(e.target.value)}
                /><br />
                <label>answer #3</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid answer!'
                    // value={answerNum}
                    onChange={(e) => answers.push(e.target.value)}
                /><br />


                <label>write a description of the feedback:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    multiline
                    placeholder='valid description!'
                    value={description}
                    onChange={(e) => setDescriptionture(e.target.value)}
                /><br />
                <label>enter a picture:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='valid picture!'
                    value={pictures}
                    onChange={(e) => setPictures(e.target.value)}
                /><br />
                <input type="submit" />
            </form>

        </div>
    )
}

export default AddFeedback
