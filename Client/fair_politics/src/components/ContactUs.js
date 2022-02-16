import React from 'react'
import Header from './Header';
import styled from 'styled-components';
const ContactUs = () => {
    return (
        <div>
            <Header title="Contact-us Page" />
            <NavLink href='https://github.com/Final-Project-bb/FairPolitics'>Our GitHub Organization</NavLink>
            <NavLink href='https://www.linkedin.com/in/tal-schreiber/' style={{top:190, left:695}}>Tal's Linkdin</NavLink>
            <NavLink href='https://www.linkedin.com/in/omer-shalom-18915720a/' style={{top:220,left:685}}>Omer's Linkdin</NavLink>
            <NavLink href='https://www.linkedin.com/in/shai-bonfil-42bb94208/' style={{top:250, left:690}}>Shai's Linkdin</NavLink>
        </div>
    )
}

const NavLink = styled.a`
  color: #fff;
   justify-content: space-between;
   flex-direction:row;
   color:black;
   font-weight:bold;
   display: flex;
   align-items: center;
   position: absolute;
  left:650px; 
  ${'' /* fontSize:30px; */}
  ${'' /* size:30px; */}
  text-decoration: none;
  ${'' /* width:200px; */}
  ${'' /* margin-left: 30px; */}
  ${'' /* top:0px; */}
  ${'' /* padding: 0 0.1rem; */}
  ${'' /* height: 350px; */}
  cursor: pointer;  
  &:hover {
  color: green;
  }
  &.active {
    color: #15cdfc; 
  }
`;


export default ContactUs
