import mongoose from "mongoose"
import {Users} from "../models/user.js"
const getProfile  = async(req,res,next) => {
    try{
        const user = await Users.findById(req.user._id).select("-password -refreshToken")
        res.json(user)
    }
    catch(err){
        next(err)
    }
}

const getOrders  = async(req,res,next) => {
    try{
        const userId = req.user._id
        const user = await Users.findById(userId).populate()
    }
    catch(err){
        
    }
}

export {getProfile}