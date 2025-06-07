import express from "express"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/error.handler.middleware.js"
import { authRouter} from "./routes/auth.route.js"
import { adminRouter } from "./routes/admin.route.js"
import { productRouter } from "./routes/product.route.js"
import {userRouter} from "./routes/user.route.js"
import { reviewRouter } from "./routes/review.route.js"
import { connectDB } from "./db.config.js"
import {serverMiddleware} from "./middleware/server.middleware.js"
import { fileURLToPath } from "url"
import path from "path"
import { downloadRouter } from "./routes/download.route.js"
dotenv.config()

//express application
const app = express()

//connection of database
connectDB(process.env.db_url)
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

serverMiddleware(app, __dirname)

//routers
app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/product", productRouter)
// app.use("/cart", cartRouter)
// app.use("/order", orderRouter)
// app.use("/orderHistory", orderHistoryRouter)
// app.use("/payment", paymentRouter)
app.use("/review", reviewRouter)
app.use("/download",downloadRouter)

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