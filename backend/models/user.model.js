import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    roles : {type : String, enum : { values : ["admin","provider", "consumer"], message : "not valid role"}},
    resetPasswordToken : Number,
    resetPasswordTokenExpiresIn : Date,
    refreshToken : String,
}, {timestamps : true, versionKey : false})

const Users = mongoose.model("users", userSchema)

export {Users}