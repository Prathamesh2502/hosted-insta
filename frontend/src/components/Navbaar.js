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
  const loginStatusMobile =()=>{
      const token = localStorage.getItem("jwt");
      if (login || token) {
        return [
          <>
              
            <Link to="/">
              <li><span class="material-symbols-outlined">
                 home
               </span></li>
            </Link>
            <Link to="/profile"><span class="material-symbols-outlined">
                account_circle</span></Link>
            <Link to="/createPost"><li><span class="material-symbols-outlined">
                      add</span></li></Link>
            <Link style={{marginLeft:"20px"}} to="/Myfollowingpost">
              <li><span class="material-symbols-outlined">
                  explore</span></li></Link>
            <Link >
              <li onClick={()=>{
                setModalopen(true)
              }}><span class="material-symbols-outlined">
               logout
              </span></li></Link>
  
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
      <img id="insta-logo" src={logo} alt="" onClick={()=>{
        navigate("/");
      }}/>
      <ul className='nav-menu'>
      {loginStatus()}
      </ul>
      <ul className='nav-mobile'>
      {loginStatusMobile()}
      </ul>
    </div>
  )
}

export default Navbaar
