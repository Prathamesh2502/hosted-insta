const express =require("express");
const app=express();
const PORT=process.env.port ||3000;
const mongoose=require("mongoose");
const {mongoUrl}=require("./key");
const cors=require("cors");
const path =require("path")

app.use(cors());
require("./models/model")
require("./models/post")

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/User"))
mongoose.connect(mongoUrl);


mongoose.connection.on("connected",()=>{
    console.log("successfully connected to go")
})
mongoose.connection.on("error",()=>{
    console.log("not connected to go")

})
// const data=require("./Data.js");

// app.get("/",(req,res)=>{
//     // res.json("hello word");
//     res.json(data)
// })
//serving the fronted
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html"),
        function(err){
            res.status(500).send(err);
        }

    )
})

app.listen(PORT,()=>{
    console.log("server is running on "+ PORT)
})