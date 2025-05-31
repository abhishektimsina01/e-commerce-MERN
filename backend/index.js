import express from "express"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/error.handler.middleware.js"
import { authRouter} from "./routes/auth.route.js"
import { userRouter } from "./routes/user.route.js"
import { connectDB } from "./db.config.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import {swaggerSpec}  from "./config/config.js"
dotenv.config()

//express application
const app = express()

//connection of database
connectDB(process.env.db_url)

//middleware
//body-pasrsing
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//cookie parsing
app.use(cookieParser())
app.use(morgan("dev"))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//routers
app.use("/auth", authRouter)
app.use("/user", userRouter)

//undefined route/method and error handler
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