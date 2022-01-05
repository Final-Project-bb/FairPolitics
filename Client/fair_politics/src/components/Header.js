import React from 'react'
import Navbar from "./Navbar/Navbar"
const Header = ({ title }) => {
  return (
    <div style={styles.title} >
      <Navbar />
      <h3 style={{ textAlign: "center" }}>Welcome to Fair Politic {title} social media</h3>
    </div>
  )
}

Header.defaultProps = {
  title: "",
};

const styles = {
  head: {
    // color:"yellow",
    flex: 1,

    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 0,
    // margin  :0,
    paddingVertical: 8,
    // padding: 20,
    textDecoration: 'none',
    // borderWidth: 4,
    borderColor: "#20232a",
    //   borderRadius: 0,
    backgroundColor: "#61dafb",
    color: "#20232a",
    //   textAlign: "center",
    // fontSize: 30,
    fontWeight: "bold"
  }
};


export default Header
