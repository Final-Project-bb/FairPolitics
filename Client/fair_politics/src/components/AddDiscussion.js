import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Header from './Header';
const AddDiscussion = () => {
    const [tags, setTags] = useState()
    const [picture, setPicture] = useState()
    const [title, setTitle] = useState()
    const [description, setDescriptionture] = useState()
    const history = useHistory();

    const handleClick = () => {
        history.push("/profile");
    }

    const addDiscussionSubmit = (event) => {
        event.preventDefault();
        // setTempPassFromDB("1225") // here should get the temp pass from server
        alert(`Add discussion submit works!`) // here should send pass to phone in sms
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
            <Header title="Add Discussion page" />
            <form onSubmit={addDiscussionSubmit}>
                <label>Tagged elected officials:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z]"
                    // required
                    placeholder='valid tags format!'
                    className='tagInput'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <small>@name1 @name2... requird Exmple:@israel israel @other person</small><br />
                <label>enter a picture:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='valid picture!'
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                /><br />
                <label>write the title:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    placeholder='a valid title!'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br />
                <label>write a description:</label>
                <input
                    type="text"
                    // pattern="[@]{1}[a-z][a-z]"
                    // required
                    aria-multiline
                    placeholder='valid description!'
                    value={description}
                    onChange={(e) => setDescriptionture(e.target.value)}
                /><br/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddDiscussion
