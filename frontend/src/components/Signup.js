import React,{useEffect,useState} from 'react'
import "../css/signup.css"
import logo from "../img/download.png"
import { Link,useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';


export default function Signup() {
  // const fetchData=async()=>{
  //   const response=await fetch("http://localhost:5000/");
  //   const data=await response.json()
  //   console.log(data)
  // }
  // useEffect(() =>{
  //   fetchData()
  // }, [])

   const navigate =useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [username,setusername] = useState("");
  const [password, setpassword] = useState("");

  const notifyA=(msg)=> toast.error(msg);
  const notifyB=(msg)=> toast.success(msg);


  const postdata=()=>{
    // console.log({
    //   name,
    //   email,
    //   username,
    //   password
    // })

    // const url = 'http://localhost:5000/signup'; // Replace this with your actual endpoint URL

    // const formData = {
    //   name: name,
    //   username: username,
    //   email: email,
    //   password: password
    // };
    
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Success:', formData);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
   

    //checking email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordregex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;


    if(!emailRegex.test(email)){
      notifyA("invalid email");
      return 
    }
    else if(!passwordregex.test(password)){
     notifyA("try to filled strong character")
     return
    }
    fetch("/signup",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if(data.error){
          notifyA(data.error)
          
        }
        else{
          notifyB(data.message)
          navigate("/signin")
        }
        console.log(data)})

  }
  return (
    <div className='signUp'>
      <div className="form-container">
        <div className="form">

        <img className='signUpLogo' src={logo} alt="" />
        <p className='loginPara'>
          Sign up to see photo and videos <br />from your friends
        </p>
        <div>
          <input type="email" name='email' id='email' value={email} onChange={(e)=>{
            setemail(e.target.value)
          }} placeholder='email' />
        </div>
        <div>
          <input type="text" name='name' id='name'placeholder='Full name' value={name} onChange={(e)=>{
            setname(e.target.value)
          }} />
        </div>
        <div>
          <input type="text" name='username' id='username' placeholder='Username' value={username} onChange={(e)=>{
            setusername(e.target.value)
          }}/>
        </div>
        <div>
          <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e)=>{
            setpassword(e.target.value)
          }}/>
        </div>
        <p className='loginPara' style={{fontSize:"12px",margin:"3px 0"}}>
          BY signing up,you agree to out Terms, <br />privacy policy and cookies policy.
        </p>
        <input type="submit" id='submit-btn' value="Sign Up" onClick={()=>{
          postdata()
        }} />
         
        </div>
        <div className="form2">
          Already have a account ? 
          <Link to="/signin">
            
            <span style={{color:"blue",cursor:"pointer"}}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
