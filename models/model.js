const mongoose=require("mongoose");
const { ObjectId } = mongoose.Schema.Types

// mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");
const userSchema=mongoose.Schema({
  username:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true},
   email:{
        type:String,
        require:true},
  password:{
        type:String,
        require:true},
  Photo:{
    type:String,
  },
  followers:[{
          type:ObjectId,
          ref:"USER"
        }],
  following:[{
          type:ObjectId,
          ref:"USER"
        }]

})
module.exports=mongoose.model("USER",userSchema);


