import React, { Component } from 'react'
import { MenuItems } from "./MenuItems"
import { NavLink } from "react-router-dom"

class Navbar extends Component {
        // let navHeight= "80"  
    // useEffect(() => {
    //     if(onBar){
    //         navHeight= "800"
    //        } 
    //     else{
    //         navHeight= "80"
    //     }
    // }, onBar) 
    render() {
        return (
            <nav style={styles.NavbarItems}>
                <ul >
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index} style={styles.navbar}>
                                <NavLink
                                    style={styles.link}
                                    activeStyle={ item.title  === "Logout" ? styles.navlinkLogout:styles.navlink  }
                                    to={item.url}>{item.title}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}
const styles = {
    navlink: {
        fontWeight: "bold",
        fontSize: 30,
        color: "green"
    },
    navlinkLogout: {
        fontWeight: "bold",
        fontSize: 20,
        // color: "red"
    },
    NavbarItems: {
        // backgroundColor:
    },
    navbar: {
        // display: flex,
        flexDirection: 'row',
        textDecoration: 'none',
        fontSize: 20,
        // display:grid,
        // CanvasGradient
        // grid-temlate-columns: repeat(5,auto),
    },
    head: {
        // color:"yellow",
        flex: 1,

        padding: 24,
        backgroundColor: "#eaeaea"
    },
    link: {
        flexDirection: 'row',
        // color: '#FFFFFF',
        textDecoration: 'none'
        // : none;
    },

};
export default Navbar