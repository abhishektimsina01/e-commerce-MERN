import { Users } from "../models/user.js"


const getAllUser = async(req,res,next) => {
    const users = await Users.find()
    res.json(users)
}
const delAllUser = async(req,res,next) => {
    try{
        await Users.deleteMany({createdAt : {$lt : Date.now()}})
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

const createAdmin = () => {

}

export {getAllUser,delAllUser, delOneUser, createAdmin} 