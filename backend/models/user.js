import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/hash.js";

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    role     : {type : String, enum : { values : ["admin","provider", "consumer"], message : "not valid role"}},
    address : String,
    resetPasswordToken : Number,
    resetPasswordTokenExpiresIn : Date,
    refreshToken : String,
}, {timestamps : true, versionKey : false})

userSchema.methods.isPasswordRight = (password) =>{
    const isSame = verifyPassword(password, this.password)
    return isSame
}

userSchema.pre("save", async function (next){
    //tjis contains the documetn to be saved
    if(!this.isModified("password")){
        next()
    }   
    else{
        this.password = await hashPassword(this.password)
        console.log("hashed password is", this.password)
        console.log(this)
    }
})

const Users = mongoose.model("users", userSchema)

export {Users}