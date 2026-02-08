import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { hashPassword, verifyPassword } from "../utils/hash.js";

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    role : {type : String, enum : { values : ["superadmin","admin","provider", "consumer"], message : "not valid role"}},
    address : String,
    isActive : Boolean
}, {timestamps : true, versionKey : false})

userSchema.methods.isPasswordRight = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.pre("save", async function (next){
    //tjis contains the documetn to be saved
    if(!this.isModified("password")){
        next()
    }   
    else{
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const Users = mongoose.model("users", userSchema)

export {Users}