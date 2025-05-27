import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()


app.listen(process.env.port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("the server has been started correctly")
    }
})