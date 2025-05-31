import express from "express"
import { login, logout, resetPassword, resetPasswordToken, signup, verifToken } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/verifToken", verifToken)
authRouter.post("/resetPasswordToken", resetPasswordToken)
authRouter.get("/resetPassword", resetPassword)
authRouter.get("/logout", logout)

export {authRouter}