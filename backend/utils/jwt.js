//logIn and Signup
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"
import { Users } from "../models/user.js"
const generateAccessAndRefreshToken = async(id) => {
    const user = await Users.findById(id)
    const accessToken  = jwt.sign({
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role        
    }, process.env.access_token, {expiresIn : "1d"})
    const refreshToken = jwt.sign({_id : user._id}, process.env.refresh_token, {expiresIn : "10d"})
    return {accessToken, refreshToken}
}

export {generateAccessAndRefreshToken}