import express from "express"
import { login, logout, resetPassword, resetPasswordToken, signup } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/resetPasswordToken", resetPasswordToken)
authRouter.get("/resetPassword", resetPassword)
authRouter.get("/logout", logout)

export {authRouter}