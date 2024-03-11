// import logo from './logo.svg';
import React,{createContext,useState} from 'react';
import './App.css';
import Navbaar from './components/Navbaar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './screen/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './screen/Profile';
import Createpost from './screen/Createpost';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context/Logincontext';
import Modal from './components/Modal';
import Userprofile from './components/Userprofile';
import Myfollowingpost from './screen/Myfollowingpost';

function App() {
  const [userlogin, setuserlogin] = useState(false);
  const [Modalopen, setModalopen] = useState(false)
  return (
    <BrowserRouter>
  <div className="App">
    <LoginContext.Provider value={{setuserlogin,setModalopen}}>

      <Navbaar login={userlogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route path="/createpost" element={<Createpost/>}></Route>
        <Route path="/profile/:userid" element={<Userprofile/>}></Route>
        <Route path="/Myfollowingpost" element={<Myfollowingpost/>}></Route> 
      </Routes>
      <ToastContainer theme='dark'/>
    { Modalopen && <Modal setModalOpen={setModalopen}></Modal>}
    </LoginContext.Provider>
  </div>
    </BrowserRouter>
  );
  }

export default App;
