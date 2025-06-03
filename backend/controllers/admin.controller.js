import { Users } from "../models/user.js"

const getAllUser = async(req,res,next) => {
    const users = await Users.find().select("-password -createdAt -updatedAt")
    res.json(users)
}

const delAllUser = async(req,res,next) => {
    try{
        await Users.deleteMany({$or : [{role : "consumer"}, {role :"provider"}]})
        res.json({
            message : "deleted all user"
        })
    }
    catch(err){
        next(err)
    }
}

const delOneUser = (req,res,next) => {
    try{
        const userId = req.params.id
        res.json({
            userId
        })
        //remove the user
    }
    catch(err){
        next(err)
    }
}

const createAdmin = async(req,res,next) => {
    //directly generating admin
    const user = await Users.create({
        name : "Abhishek Timsina",
        password : "abhi123@@##**",
        email : "timsinaabhishek1@gmail.com",
        address : "Kalopul,Kathmandu",
        role: "superadmin"
    })
    res.json(user)
}

export {getAllUser,delAllUser, delOneUser, createAdmin} 