const express =require("express");
const router=express.Router();
const mongoose=require("mongoose");
const USER=mongoose.model("USER");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken")
const {Jwt_secret}=require("../key");
const requireLogin = require("../middleware/requireLogin");



// router.get ("/createpost",requireLogin,(req,res)=>{
    

// })

router.post("/signup",(req,res)=>{
    const {name,username,email,password}=req.body;
    if(!name||!email||!username||!password){
       return res.status(422).json({error:"please add all the fields"})
    }
    USER.findOne({ $or: [{email:email},{username:username}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exits with that email or username"})
        }
        bcrypt.hash(password,12).then((hashedPassword)=>{
            const user= new USER({
                name,
                username,
                email,
                password:hashedPassword
            })
            user.save().then(user=>{res.json({message:"register successfully"})})
            .catch(err=> {console.log(err)})
        })
    })
})
router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
       return res.status(422).json({error:"please add all the fields"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid email"})
        }
        // console.log(savedUser);
        bcrypt.compare(password,savedUser.password).then((match)=>{
           if(match){
            // res.status(200).json({message:"signed in successfully"});
            const token=jwt.sign({_id:savedUser.id}, Jwt_secret);
            const {_id,name,email,username}=savedUser
            res.json({token,user:{_id,name,email,username}});
            console.log({token,user:{_id,name,email,username}});
           }
           else{
            res.status(422).json({error:"invalid password"});
           }
        }).catch(err=> {console.log(err)})
    })
})
module.exports=router;