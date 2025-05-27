import express from "express"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/error.handler.middleware.js"
import { authRouter} from "./routes/auth.router.js"
import { userRouter } from "./routes/user.router.js"
import { connectDB } from "./db/db.config.js"
import cookieParser from "cookie-parser"
dotenv.config()

//express application
const app = express()

//connection of database
connectDB(process.env.db_url)

//middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

//routers
app.use("/auth", authRouter)
app.use("/user", userRouter)

app.use(notFound)
app.use(errorHandler)
app.listen(process.env.port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("the server has been started correctly",process.env.port)
    }
})