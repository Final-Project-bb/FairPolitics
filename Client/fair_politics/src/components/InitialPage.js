import React from 'react'
import Header from './Header';
const InitialPage = () => {
    return (
        <div>
            {/* <a href=''>Login<a/> */}
            <Header/>
        </div>
    )
}

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
    //   marginTop: 0,
      paddingVertical: 8,
      padding: 20,
      textDecoration: 'none',
      borderWidth: 4,
      borderColor: "#20232a",
    //   borderRadius: 0,
      backgroundColor: "#61dafb",
      color: "#20232a",
    //   textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    }
  };
  

export default InitialPage