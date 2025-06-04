import { Users } from "../models/user.js"

const getAllUser = async(req,res,next) => {
    const users = await Users.find().select("-password -createdAt -updatedAt")
    res.json(users)
}

const getOneUser = async(req,res,next) => {
    const userId = req.params.id
    const resut = await Users.aggregate([
        {$match : {_id : userId}},
        {$lookup : {
            from : "orders",
            localFeild : "_id",
            foreignField : "user",
            as : "orders"
        }},
        {$lookup : {
            from : "reviews",
            localFeild : "_id",
            foreignField : "user",
            as : "reviews"
        }},
        {$project : {
            _id : 1,
            name : 1,
            email : 1,
            address : 1,
            orders : {
                $map : {
                    input : "orders",
                    as : "order",
                    in : {
                        _id : "$$order._id",
                        product : "$$order.product"
                    }
                }
            },
            reviews : {
                $map : {
                    input : "reviews",
                    as : review,
                    in : {
                        
                    }
                }
            }
        }},
    ])
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

const delOneUser = async(req,res,next) => {
    try{
        const userId = req.params.id
        await Users.deleteOne({_id : userId})
        res.json({message : "deleted user"})
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