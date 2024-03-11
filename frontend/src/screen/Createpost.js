import React,{useState,useEffect} from 'react'
import "../css/createpost.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setbody] = useState("");
  const [image, setimage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


  useEffect(() => {

    // saving post to mongodb
    if (url) {

      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])


  // posting image to cloudinary
  const postdeatil = () => {

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset","insta clone");
    data.append("cloud_name","instagram1");
    fetch("https://api.cloudinary.com/v1_1/instagram1/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
    console.log(url)

  }


  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

    
  return (
    <div className='createPost'>
        <div className="post-header">
            <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
            <button id='post-btn' onClick={()=>{
              postdeatil()
            }}>Share</button>
        </div>
        <div className="main-div">
            <img id='output' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"/>
            <input type="file"accept='image/*' onChange={(event)=>{
                loadfile(event)
                setimage(event.target.files[0])
            }} />
        </div>
        <div className="details">
          <div className="car-header">
             <div className="card-pic">
                 <img src="https://previews.123rf.com/images/olegd/olegd1803/olegd180300249/97834693-shiva-statue-hindu-idol-in-bali-indonesia-close-up.jpg" alt=""/> 
             </div>
             <h5>hare krishna</h5>
          </div>
          <textarea value={body} onChange={(e)=>{
            setbody(e.target.value)
          }} type="text" placeholder='write a caption'></textarea>
        </div>
    </div>
  );
}
