const { postModel } = require("../Models/postModel");

const postRoute = require("express").Router();

postRoute.get("/",async(req,res)=>{
    try{
        let post = await postModel.find()
        res.send({"seccuss":post})
    }catch(err){
        res.send({"err":"Something went wrong"})
    }
})

postRoute.post("/create",async(req,res)=>{
    const data = req.body
    try{
        let post = new postModel(data)
        await post.save()
        res.send("Posted successfully")
    }catch(err){
        res.send({"err":"Something went wrong"})
    }
})

postRoute.patch("/edit/:id",async(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    const post = await postModel.find({_id:id})
    const postID = post[0].userID;
    const dataID = data.userID
    try{
        if (postID !== dataID){
            res.send("You are not authorised")
        } else {
            await postModel.findByIdAndUpdate({_id:id},data)
            res.send("Updated successfully")
        }
    }catch(err){
        res.send({"err":"Something went wrong"})
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    const post = await postModel.find({_id:id})
    const postID = post[0].userID;
    const dataID = data.userID
    try{
        if (postID !== dataID){
            res.send("You are not authorised")
        } else {
            await postModel.findByIdAndDelete({_id:id})
            res.send("Deleted successfully")
        }
    }catch(err){
        res.send({"err":"Something went wrong"})
    }
})

module.exports={
    postRoute
}