const jwt = require("jsonwebtoken")

const authentication =(req,res,next)=>{
    const token = req.headers.authorization
    // console.log(token)
    if (token){
        const decoded = jwt.verify(token,'hilton')
        if (decoded){
            const userID = decoded.userID;
            console.log(decoded)
            req.body.userID= userID
            next()
        } else {
            res.send("Please login first")
        }
    } else {
        res.send("Please Login first")
    }
}


module.exports={
    authentication
}