import React ,{useState,useContext} from "react";
import logo from "../img/download.png";
import { Link,useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import "../css/signin.css"
// qn}KmgiK'&?)3-S
import { LoginContext } from "../context/Logincontext";

export default function Signin() {
  const {setuserlogin}=useContext(LoginContext)
  const navigate =useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const notifyA=(msg)=> toast.error(msg);
  const notifyB=(msg)=> toast.success(msg);


  const postdata=()=>{
    fetch("/signin",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if(data.error){
          notifyA(data.error)
          
        }
        else{
          notifyB("signed in successfully")
          console.log(data)
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          
          setuserlogin(true)
          navigate("/")
        }
        console.log(data)})

  }


  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input type="email" name="email" id="email" placeholder="email" value={email} onChange={(e)=>{
            setemail(e.target.value)}}/>
          </div>
          <div>
            <input
              type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e)=>{
                setpassword(e.target.value)
              }}/>
          </div>
          <input type="submit" id="login-btn" value="Sign In"  onClick={()=>{
          postdata()
        }} />
        </div>
        <div className="loginform2">
          Don't have a account? 
          <Link to="/signUp">
            <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
