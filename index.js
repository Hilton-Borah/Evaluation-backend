const express = require("express");
const { connection } = require("./Controller/db");
const { authentication } = require("./Middlewares/authentication");
const { authRotes } = require("./Routes/authRoutes");
const { postRoute } = require("./Routes/postRoutes");
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/user",authRotes)
app.use(authentication)
app.use("/post",postRoute)

app.listen(4500,async()=>{
    try{
        await connection
        console.log("Database established")
    }catch(err){
        console.log("err",err)
    }
    console.log(`Server running on port ${process.env.PORT}`)
})