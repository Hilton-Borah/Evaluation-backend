const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const postModel = mongoose.model("post",postSchema)

module.exports ={
    postModel
}