import React from 'react'
import Header from './Header';
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Register = () => {
    const [phone, setPhone] = useState();
    const [tempPass, setTempPass] = useState();
    const [tempPassFromDB, setTempPassFromDB] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [location, setLocation] = useState();
    const [rule, setRule] = useState();
    const [picture, setPicture] = useState();

    // const [approve]  

    const phoneSubmit = (event) => {
        event.preventDefault();
        setTempPassFromDB("1225") // here should get the temp pass from server
        alert(`The name you entered was: ${tempPassFromDB}`) // here should send pass to phone in sms
        // if(tempPassFromDB===tempPass){
        //     alert(`Password approved`)
        // }
        // else{
        //     alert(`Password failed`)    
        // }
    }
    const approveSubmit = (event) => {
        event.preventDefault();
        if (tempPassFromDB === tempPass) {
            alert(`Password approved`)
        }
        else {
            alert(`Password failed`)
        }
    }
    const registerSubmit = (event) => {
        const newUser={
            firstName:firstName,
            lastName:lastName,
            location:location,
            rule:rule,
            picture:picture
        }
        addNewUser(newUser)
    }
    const addNewUser = (newUser) => {
        // users.push(newUser)
    }
    const history = useHistory();
    const handleClick = () => {
        history.push("/connection/login");
    }
    return (
        <div >
            <Header title="Register Page" />
            <form onSubmit={phoneSubmit}>
                <label>Enter a Phone Number:</label>
                <input
                    type="tel"
                    pattern="[0]{1}[5]{1}[0-9]{8}"
                    required
                    placeholder='valid phone number!'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <small>05... requird Exmple: 0544567891</small><br />
                <input type="submit" />
            </form>
            <form onSubmit={approveSubmit}>
                <label>Enter a temporary password:</label>
                <input
                    type="password"
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='password from sms!'
                    value={tempPass}
                    onChange={(e) => setTempPass(e.target.value)}
                />
                <br />
                <input type="submit" />
            </form>
            <form onSubmit={registerSubmit}>
                <label>Enter your first name:</label>
                <input
                    type="text"
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='first name!'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                /><br />
                <label>Enter your last name:</label>
                <input
                    type="text"
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='last name!'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                /><br />
                <label>Enter your location:</label>
                <input
                    type="text"
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='location!'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                /><br />
                <label>Enter your rule:</label>
                <input
                    type="text"
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='Rule!'
                    value={rule}
                    onChange={(e) => setRule(e.target.value)}
                /><br />
                <label>Insert your Profile's picture:</label>
                <input
                    type="text"
                    // pattern="[0]{1}[5]{1}[0-9]{8}"
                    // required
                    placeholder='Picture!'
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                /><br />
                <input type="submit" />
            </form>
            <button>Facebook</button><br />
            <button>Gmail</button><br />
            <button onClick={handleClick}>already have an account ? sign in here!</button>
        </div>
    )
}



export default Register
