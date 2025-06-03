import { Users } from "../models/user.js"
import { generateAccessAndRefreshToken } from "../utils/jwt.js";
import {userLogInSchema, userSignUpSchema} from "../validation/validation.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
const signup = async(req,res,next) =>{
    const allowedRoles = ["consumer", "provider"]
    try{
        let {error} = userSignUpSchema.validate(req.body)
        if(error){
            error.status = 400
            throw error
        }
        const {name, password, email, address} = req.body
        const isEmailExist = await Users.findOne({email})
        if(isEmailExist){
            const err = new Error("Email already exist")
            err.status = 406
            throw err
        }
        const role = (allowedRoles.includes(req.body.role)) ? req.body.role : "consumer"
        let user = await Users.create({
            name,
            email,
            password,
            role,
            address
        })
        const {accessToken, refreshToken} = generateAccessAndRefreshToken(user._id)
        const option = {
            httpOnly : true,
            secure : true,
            sameSite : "strict", 
            maxAge : 2*24*60*60 *1000
        }
        res.cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option)
        res.status(200).json({
            message : "registered"
        })
    }
    catch(err){
        next(err)
    }
}

const login = async(req,res,next) =>{
    try{
            const {error} = userLogInSchema.validate(req.body)
            if(error){
                throw error
            }
            const {email , password} = req.body
            const user = await Users.findOne({email})
            console.log(user)
            if(!user){
                const err = new Error("no user found")
                err.status = 404
                throw err
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if(!isPasswordCorrect){
                const err = new Error("email or password is not right")
                err.status = 400
                throw err
            }
            const option = {
            httpOnly : true,
            secure : true,
            sameSite : "strict", 
            maxAge : 2*24*60*60 *1000
        }
            const {accessToken, refreshToken} = generateAccessAndRefreshToken(user)
            res.cookie("accessToken", accessToken,option).cookie("refreshToken", refreshToken, option)
            console.log(accessToken, "\n", refreshToken)
            res.status(200).json({
                message : "Logged In"
            })
    }
    catch(err){
        next(err)
    }
}

const refresh = async(req,res,next) => {
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            const err = new Error("no cookie found")
            throw(err)
        }
        const data = jwt.verify(refreshToken, process.env.refresh_token)
        const user = await Users.findById(data._id).select("-password -createdAt -updatedAt")
        const option = {
            httpOnly : true,
            secure : true,
            sameSite : "strict", 
            maxAge : 2*24*60*60 *1000
        }
        const {accessToken, newRefreshToken} = generateAccessAndRefreshToken(user)
        user.refreshToken = newRefreshToken
        await user.save()
        res.cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option)
        res.json({
            refreshToken
        })
    }
    catch(err){
        next(err)
    }
}

const resetPassword = async(req,res,next) =>{
    try{
        const {NewPassword, ConfirmPassword} = req.body
        if(NewPassword != ConfirmPassword){
            const err = new Error("Should be a same password")
            throw err
        }
    }
    catch(err){

    }
}

const resetPasswordToken = async(req,res,next) =>{
    try{
        const {email} = req.body
        const isEmailExist = await Users.findOne({email})
        if(!isEmailExist){
            const err = new Error("User doesnt exist with that email")
            throw err
        }

    }
    catch(err){
        next(err)
    }
}

const logout = (req,res,next) =>{
    try{
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.json({message : "loggout Out"})
    }
    catch(err){
        next(err)
    }
}

export {login,signup,refresh,resetPassword,resetPasswordToken, logout}