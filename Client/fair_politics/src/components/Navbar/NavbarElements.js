import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  ${'' /* background: linear-gradient(135deg, rgb(11,15,67) 5%,rgb(27,100,221) ); */}
   ${'' /* width: 14px; */}
  ${'' /* height: 24px; */}
  ${'' /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */}
 ${'' /* background-position: 50% 50%; */}
 ${'' /* background-repeat: no-repeat; */}
  padding-left: 1rem;
  background: transparent linear-gradient(93deg,#025fdb 0%,#025fdb 35%,#0b3668 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0 3px 20px rgb(0 0 0 / 8%);
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLinkBar = styled(Link)`
   color: #fff;
   justify-content: space-between;
   flex-direction:row;
   display: flex;
   align-items: center;
   position: relative;
  left: 0px; 
  text-decoration: none;
  margin-left: 155px;
  top:50px;
  padding: 0 1rem;
  font-size: 2rem;
  height: 80;
  cursor: pointer;  
  &:hover {
  color: green;
  }
  &.active {
    color: #15cdfc; }
  ${'' /*display: flex;
  flex-direction:row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  left: 400px; 
  top:-100px;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;  
  &.active {
    color: #15cdfc; */}
  }
  @media screen and (max-width: 768px) {
    display: flex;
    ${'' /* color:"red"; */}
    ${'' /* display:flex; */}
    ${'' /* backgroundColor:"red"; */}
    ${'' /* position: sticky; */}
    ${'' /* top: 80px; */}
    font-size: 1.5rem;
    position: relative;
    left: 400px;
    top:50px;
    ${'' /* left:-120px; */}
    ${'' /* align-items: flex-start; */}
    ${'' /* margin-right: 10px; */}
    ${'' /* flex-direction:row; */}
    ${'' /* display: block;
    backgroundColor:"red";
    text-decoration: none;
    flex-direction:row;
    flex-direction:column;
    
    position: relative;
    top: 20px;
    right: -100px;
    transform: translate(-100%, 75%);
    font-size: 1.5rem;
    cursor: pointer; */}
  }
`;
export const NavIconSearch = styled.div`
@media screen and (min-width: 768px){
color: "red";
${'' /* #fff */}
display: flex;
${'' /* flex-direction:row; */}
${'' /* justify-content: flex-end; */}
align-items: center;
position: absolute;
left: 225px;
top:0px; 
${'' /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */}
${'' /* background-position:absolute 540px; */}
${'' /* background-position: right 50px center;
background-repeat:no-repeat;
background-size:50px; */}
text-decoration: flex;
padding: 0 1rem;
height: 100%;
cursor: pointer;  
${'' /* font-size: 1.8rem; */}
&.active {
  color: #15cdfc;
}
}
@media screen and (max-width: 768px) and (min-width: 668px) {
  display: block;
  ${'' /* left:100px; */}
  position: absolute;
  ${'' /* width:250px; */}
left: 275px;
top:-30px; 
  transform: translate(-100%, 75%);
  ${'' /* font-size: 1.8rem; */}
  cursor: pointer;
}
@media screen  and (min-width:0px) and (max-width: 668px) {
  display: block;
  ${'' /* left:100px; */}
  position: absolute;
  ${'' /* width:250px; */}
left: 222px;
top:-8px; 
  transform: translate(-100%, 75%);
  ${'' /* font-size: 1.8rem; */}
  cursor: pointer;
}
`;
export const NavLinkSearch = styled(Link)`
color: "red";
${'' /* #fff */}
display: flex;
${'' /* flex-direction:row; */}
${'' /* justify-content: flex-end; */}
align-items: center;
position: absolute;
left: 50px;
top:-320px; 
${'' /* background-image: url(data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C11%20C5%2C7.691%207.691%2C5%2011%2C5%20C14.309%2C5%2017%2C7.691%2017%2C11%20C17%2C14.309%2014.309%2C17%2011%2C17%20C7.691%2C17%205%2C14.309%205%2C11%20M20.707%2C19.293%20L17.312%2C15.897%20C18.365%2C14.543%2019%2C12.846%2019%2C11%20C19%2C6.589%2015.411%2C3%2011%2C3%20C6.589%2C3%203%2C6.589%203%2C11%20C3%2C15.411%206.589%2C19%2011%2C19%20C12.846%2C19%2014.543%2C18.365%2015.897%2C17.312%20L19.293%2C20.707%20C19.488%2C20.902%2019.744%2C21%2020%2C21%20C20.256%2C21%2020.512%2C20.902%2020.707%2C20.707%20C21.098%2C20.316%2021.098%2C19.684%2020.707%2C19.293%22%20id%3D%22path-1%22%3E%3C/path%3E%0A%20%20%20%20%3C/defs%3E%0A%20%20%20%20%3Cg%20id%3D%22search%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20fill%3D%22white%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%20%20%20%20%3C/mask%3E%0A%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22%uD83C%uDFA8-Icon-%u0421olor%22%20fill%3D%22%230D1C2E%22%20fill-rule%3D%22nonzero%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C/use%3E%0A%20%20%20%20%3C/g%3E%0A%3C/svg%3E); */}
${'' /* background-position:absolute 540px; */}
${'' /* background-position: right 50px center;

background-repeat:no-repeat;
background-size:50px; */}
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;  
${'' /* font-size: 1.8rem; */}
&.active {
  color: #15cdfc;
}
@media screen and (max-width: 768px) {
  display: block;
  ${'' /* left:100px; */}
  position: absolute;
  ${'' /* width:250px; */}
left: 350px;
top:-495px; 
  transform: translate(-100%, 75%);
  ${'' /* font-size: 1.8rem; */}
  cursor: pointer;
}
`;
// export const NavLinkBar = styled(Link)`
//   ${'' /* color: "red"; */}
//   color: #fff;
//   justify-content: space-between;
//   ${'' /* #fff */}
//   display: flex;
//   flex-direction:row;
//   ${'' /* justify-content: flex-end; */}
//   align-items: center;
//   ${'' /* position: relative; */}
//   ${'' /* left: 400px;  */}
//   ${'' /* top:-100px; */}
//   text-decoration: none;
//   padding: 0 1rem;
//   height: 100%;
//   cursor: pointer;  
//   &.active {
//     color: #15cdfc;
//   }
//   @media screen and (max-width: 768px) {
//     display: block;
//     backgroundColor:"red";
//     text-decoration: none;
//     ${'' /* flex-direction:row; */}
//     flex-direction:column;
//     left:540px;
//     position: relative;
//     top: 20px;
//     right: -100px;
//     transform: translate(-100%, 75%);
//     font-size: 1.5rem;
//     cursor: pointer;
//   }
// `;
export const NavLink = styled(Link)`
  color: #fff;
   justify-content: space-between;
   flex-direction:row;
   display: flex;
   align-items: center;
   position: relative;
  left: -200px; 
  text-decoration: none;
  margin-left: 5px;
  top:50px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;  
  &:hover {
  color: green;
  }
  &.active {
    color: #15cdfc; }
  ${'' /*display: flex;
  flex-direction:row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  left: 400px; 
  top:-100px;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;  
  &.active {
    color: #15cdfc; */}
  }
  @media screen and (max-width: 768px) {
    display: none;
    ${'' /* color:"red"; */}
    ${'' /* display:flex; */}
    ${'' /* backgroundColor:"red"; */}
    position: relative;
    top: 80px;
    font-size: 1.5rem;
    left:-120px;
    ${'' /* align-items: flex-start; */}
    ${'' /* margin-right: 10px; */}
    ${'' /* flex-direction:row; */}
    ${'' /* display: block;
    backgroundColor:"red";
    text-decoration: none;
    flex-direction:row;
    flex-direction:column;
    
    position: relative;
    top: 20px;
    right: -100px;
    transform: translate(-100%, 75%);
    font-size: 1.5rem;
    cursor: pointer; */}
  }
`;
export const Bars = styled(FaBars)`
  display: flex;
  color: #fff;
  font-size: 1.8rem;
  ${'' /* position: sticky;
    top: 0px;
    left: 1070px; */}
        position: absolute;
    top: 0;
    right: 0;
    &:hover {
  color: green;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const Language = styled.div`
  display: flex;
  color: #fff;
  font-size: 1rem;
  ${'' /* position: sticky;
    top: 0px;
    left: 1070px; */}
        position: absolute;
    top: 0;
    right: 70px;
    &:hover {
  color: green;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 0;
    right: 15px;
    transform: translate(-100%, 75%);
    font-size: 1rem;
    cursor: pointer;
  }
`;
export const NavMenuBar = styled.div`
  display: none;
  align-items: center;
  flex-direction:column;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: flex;
    ${'' /* display: flex; */}
    position: relative;
    left: -380px;
    height:200px;
    top:50px;
    ${'' /* right:10px; */}
    flex-direction:column;
    align-items: center;
    ${'' /* text-decoration: none; */}
    ${'' /* flex-direction:column; */}
    ${'' /* position: relative; */}
    ${'' /* left: -550px; */}
    ${'' /* flex-direction:row; */}
  }
`;
export const NavMenu = styled.div`
 display: flex;

 ${'' /* flex-direction:row; */}
 ${'' /* position: absolute; */}
 ${'' /* margin-right: 24px; */}
  /* position: relative;
  ${'' /* display: flex;
  align-items:center;
  flex-direction:row;
  margin-right: -24px; */}
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;*/
  ${'' /* flex-direction:row; */}
  ${'' /* flex-direction:column; */}
    ${'' /* position: relative; */}
    ${'' /* left: -550px; */}
    ${'' /* right:10px; */}
  ${'' /* white-space: nowrap;  */}
  
  @media screen and (max-width: 768px) {
    display: none;
    ${'' /* display: flex; */}
    position: relative;
    left: 300px;
    height:200px;
    ${'' /* right:10px; */}
    flex-direction:column;
    align-items: center;
    ${'' /* text-decoration: none; */}
    ${'' /* flex-direction:column; */}
    ${'' /* position: relative; */}
    ${'' /* left: -550px; */}
    ${'' /* flex-direction:row; */}
  }
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  position:sticky;
  margin-right: 24px;
  top:20px;
  left:2500px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: flex;
    position:relative;
    ${'' /* position:sticky; */}
  ${'' /* margin-right: 24px; */}
  ${'' /* top:540px; */}
  ${'' /* left:40px; */}
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
  @media screen and (max-width: 768px) {
    position:relative;
    top:5px;
    right:2150px; 
  }
`;