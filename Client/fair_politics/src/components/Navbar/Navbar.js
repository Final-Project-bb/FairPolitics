import { MenuItems } from "./MenuItems"
import React from 'react';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import {
    Nav,
    NavLink,
    NavLinkBar,
    NavLinkSearch,
    NavMenuBar,
    Bars,
    Language,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavIconSearch
} from './NavbarElements';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const Navbar = () => {
    const [search, setSearch] = useState();
    const [onBar, setOnBar] = useState(false);
    const [navHeight, setNavHeight] = useState("80px");
    const [navDisplay, setNavDisplay] = useState("none");
    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    }
    const onSearch = (event) => {
        event.preventDefault();
        alert("Search clicked")
    }
    const onPressBar = (event) => {
        event.preventDefault();
        setOnBar(!onBar)
        // alert("bar clicked")
    }
    const onLanguagePress=()=>{
        alert("Language clicked")
    }
    // let navHeight= "80px"  
    useEffect(() => {
        if (onBar) {
            setNavHeight("300px")
            setNavDisplay("flex");
        }
        else {
            // setNavDisplay("none");
            setNavHeight("80px")
            setNavDisplay("none");
        }
    }, [onBar])
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch()
        }
    }
    return (
        <>
            <Nav style={{ height: navHeight }}>
                <img src={require('../../images/govLogo.jpg')} alt='logo'
                    style={{ borderRadius: 300, height: 50, position: 'absolute', left: 5 }}
                    onClickCapture={handleClick}
                />
                {/* <NavLinkSearch to='/'> */}
                <form onSubmit={onSearch}
                    style={styles.formStyle}
                    >
                    <label onClick={onSearch}>Search:</label>
                    <input
                        onKeyDown={handleKeyDown(onSearch)}
                        style={{ height: "30px", width: "200px", borderRadius: 70, }}
                        type="text"
                        placeholder='search here!'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* <input type="submit" style={{ color: "white", backgroundColor: "black" }} /> */}
                </form>
                {/* </NavLinkSearch> */}

                <Bars onClickCapture={onPressBar} />
                <Language onClickCapture={onLanguagePress}>language </Language>
                {/* {!onBar && style={{display:navDisplay}}*/}

                {/* } */}
                {/* </Bars> */}
                <NavMenuBar style={{ display: navDisplay }} >
                    {MenuItems.map((item, index) => {
                        return (
                            <NavLinkBar
                                key={index}
                                to={item.url}
                            >
                                {item.title}
                            </NavLinkBar>
                        )

                    })}
                </NavMenuBar>
                <NavBtn>
                    <NavBtnLink to='/connection/login'>Sign In</NavBtnLink>
                </NavBtn>
                <div >
                    {/* {onBar && */}
                    <NavMenu style={{ display: navDisplay == "none" ? "flex" : "none" }}>
                        <br />
                        {MenuItems.map((item, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={item.url}
                                >
                                    {item.title}<br />
                                </NavLink>
                            )
                        })
                        }
                    </NavMenu>
                    {/* } */}
                </div>
            </Nav>
        </>
    );
};
const styles = {
    formStyle: {
        color: "#15cdfc",
        position: 'absolute',
        left: 65,
        top: 20,
    },
    
}
export default Navbar;