import React ,{useContext}from 'react'
import "../css/navbaar.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "../img/download.png"
import { LoginContext } from '../context/Logincontext'


const Navbaar = ({login}) => {
  const  navigate=useNavigate();
 const {setModalopen}=useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">Create Post </Link>
          <Link style={{marginLeft:"20px"}} to="/Myfollowingpost"> My Following</Link>
          <Link >
            <button  className="primaryBtn " onClick={()=>{
              setModalopen(true)
            }}> Log out</button></Link>

          </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };
  return (
    <div className='navbar'>
      <img src={logo} alt="" onClick={()=>{
        navigate("/");
      }}/>
      <ul className='nav-menu'>
      {loginStatus()}
      </ul>
    </div>
  )
}

export default Navbaar
