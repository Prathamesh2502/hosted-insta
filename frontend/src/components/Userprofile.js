import React, { useEffect, useState } from "react";
import Postdetail from "./Postdetail";
import "../css/Profile.css";
import { useParams } from "react-router-dom";

export default function Userprofile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([])
  const [isFollow, setIsFollow] = useState(false);
  const [posts, setPosts] = useState([]);
  const { userid } = useParams();
  const [user, setUser] = useState("")
  // const [changePic, setChangePic] = useState(false)

  // const toggleDetails = (posts) => {
  //   if (show) {
  //     setShow(false);
  //   } else {
  //     setShow(true);
  //     setPosts(posts);
  //   }
  // };

  
  // to follow user
  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setIsFollow(true);
    });
  };
  
  // to unfollow user
  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
      setIsFollow(false);
    });
  };


  useEffect(() => {
    // ${JSON.parse(localStorage.getItem("user"))._id}`,
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result)=> {
          console.log(result);
          setUser(result.user);
          setPosts(result.post);
          if (
            result.user.followers.includes(
              JSON.parse(localStorage.getItem("user"))._id)
          ){
            setIsFollow(true);
          }
           });
  }, [isFollow]);


  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
           {/* onClick={changeprofile} */}
           <img src={user.Photo ? user.Photo : picLink} alt=""/> 

        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <div style={{display:"flex",alignItems:"center", justifyContent:"space-between"}}>
          <h1>
            {user.name}
          </h1>
          <button className="followBtn" onClick={()=>{
            if(isFollow){
              unfollowUser(user._id)
            }
            else{
              followUser(user._id)
            }
          }
            }>{isFollow? "unfollow" :"follow"}</button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>
              {posts.length } posts</p>
            <p>
              {user.followers ? user.followers.length : "0"}  followers</p>
            <p>
              {user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {posts.map((pics) => {
          return <img key={pics._id} src={pics.photo}
            // onClick={() => {
            //   toggleDetails(pics)
            // }}
            className="item"></img>;
        })}
                
 </div>

      {/* {show &&
        <Postdetail item={posts} 
        toggleDetails={toggleDetails} 
        />
      } */}
      {/* {
        changePic &&
        <ProfilePic changeprofile={changeprofile} />
      } */}
    </div>
  );
}
