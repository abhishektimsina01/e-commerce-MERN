import { Users } from "../models/user.js"
import {userLogInSchema, userSignUpSchema} from "../validation/validation.js"
const login = async(req,res,next) =>{
    try{
        const isUser = async(req,res,next) =>{
            const {error} = userLogInSchema.validate(req.body)
            if(error){
                throw err
            }
            const {email , password} = req.body
            const user = await Users.findOne({email})
            if(!user){
                const err = new Error("no user found")
                throw err
            }
            const isPasswordRight = user.checkPassword(password)
            if(!isPasswordRight){
                const err = new Error("email or password is not right")
                throw err
            }
            res.status.json({
                message : "Logged In"
            })
        }
    }
    catch(err){
        next(err)
    }
}

const signup = async(req,res,next) =>{
    try{
        const {error} = userSignUpSchema.validate(req.body)
        if(error){
            throw err
        }
        const {name, password, email} = req.body
        res.status(200).json({name ,password, email})
    }
    catch(err){
        next(err)
    }
}

const resetPassword = async(req,res,next) =>{
    try{

    }
    catch(err){

    }
}

const resetPasswordToken = async(req,res,next) =>{
    try{

    }
    catch(err){

    }
}

const logout = async(req,res,next) =>{
    try{

    }
    catch(err){
        
    }
}

export {login,signup,resetPassword,resetPasswordToken, logout}