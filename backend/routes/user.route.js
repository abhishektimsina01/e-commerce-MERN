import express from 'express'
import { authenticateUser } from '../middleware/authenticateUser.js'
import {authorizeUser} from "../middleware/authorizedRoute.js"
import { getProfile } from '../controllers/user.controller.js'
const userRouter = express.Router()

userRouter.get("/profile",authenticateUser, authorizeUser("consumer", "provider", "admin", "superadmin"), getProfile)
export {userRouter}