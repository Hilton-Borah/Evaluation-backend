const { authModel } = require("../Models/authModel");
const bcrypt = require('bcrypt');
const authRotes = require("express").Router();
const jwt = require('jsonwebtoken');

authRotes.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            if (err){

                res.send({"err":err})
            } else {
                let user = new authModel({name,email,gender,password:hash})
                await user.save()
                res.send({"msg":"Registered successfully"})
            }
        });

    }catch(err){
        res.send({"err":err})
    }
})

authRotes.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        let user = await authModel.find({email})
        if (user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if (result){
                    const token = jwt.sign({ userID :user[0]._id }, 'hilton');
                    res.send({"msg":"Login successfully","token":token})
                } else {
                    console.log("hdhdh")
                    res.send({"err":"Something went wrong"})
                }
            });
        } else {
            res.send({"err":"Wrong credential"})
        }
    }catch(err){
        res.send({"err":"Something went wrong"})
    }
})

module.exports={
    authRotes
}