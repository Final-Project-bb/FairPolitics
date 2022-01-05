import React from 'react'
import Header from './Header';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState();
  const history = useHistory();
  const handleClick=()=> {
    history.push("/connection/register");
  }

  return (
    <div >
      {/* <a href=''>Login<a/> */}
      <Header title="Login Page" />
      <form>
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
      </form>
      <button>Facebook</button><br />
      <button>Gmail</button><br/>
      <button onClick={handleClick}>don't have an account ? sign up here!</button>
    </div>
  )
}
// ReactDOM.render(<MyForm />, document.getElementById('root'));
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


export default Login
