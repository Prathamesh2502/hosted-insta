const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    likes:[{type:ObjectId,
        ref:"USER"
    }],
    posted: {
        type: ObjectId,
        ref: "USER"
    },
    comments: [{
        comment: { type: String },
        posted: { type: ObjectId, ref: "USER" }
    }],
    photo: {
        type: String,
        required:true
    }
},{timestamps:true})

mongoose.model("POST", postSchema)
