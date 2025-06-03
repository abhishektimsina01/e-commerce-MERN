import express from 'express'
import { authenticateUser } from '../middleware/authenticateUser'
import {authorizeUser} from "../middleware/authorizedRoute.js"
const userRouter = express.Router()

userRouter.get("/profile",authenticateUser, authorizeUser("consumer", "provider", "admin", "superadmin"), getProfile)

export {userRouter}