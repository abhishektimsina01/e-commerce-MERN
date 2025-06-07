import mongoose from "mongoose"
import { Products } from "../models/product.js"
import { Users } from "../models/user.js"

const getAllUser = async(req,res,next) => {
    const users = await Users.find().select("-password -createdAt -updatedAt")
    res.json(users)
}

const getOneUser = async(req,res,next) => {
    const userId = req.params.id
    const user = await Users.findById(userId)
    if(user.role == "consumer"){    
        const resut = await Users.aggregate([
            {$match : {_id : new mongoose.Types.ObjectId(userId)}},
            {$lookup : {
                from : "orders",
                localField : "_id",
                foreignField : "orderedBy",
                as : "orders"
            }},
            {$lookup : {
                from : "reviews",
                localField : "_id",
                foreignField : "user",
                as : "reviews"
            }},
            {$project : {
                name : 1,
                email : 1,
                isActive : 1,
                orders : {
                    $map : {
                        input : "$orders",
                        as : "order",
                        in : {
                            product : "$$order.product",
                            quantity : "$$order.quantity",
                            price : "$$order.price",
                            total : {$multiply : ["$$order.quantity", "$$order.price"]}
                        }
                    }
                }
            }}
        ])
        res.json(resut)
    }
    else if(user.role == "provider"){
        const resut = await Users.aggregate([
            {$match : {_id : new mongoose.Types.ObjectId(userId)}},
            {$lookup : {
                from : "products",
                localField : "_id",
                foreignField : "productOwner",
                as : "products"
            }},
            // {$unwind : "$products"}  
            // {$lookup : {
            //     from : "reviews",
            //     localField : "_id",
            //     foreignField : "product",
            //     as : "review"
            // }},  
            {$project : {
                _id : 0,
                name : 1,
                email : 1,
                isActive : 1,
                prodcuts : {
                    $map : {
                        input : "$products",
                        as : "product",
                        in : {
                           name : "$$product.name",
                           stock : "$$product.stock",
                           price : "$$product.price",
                           state : "$$product.state",
                           categoriy : "$$product.category"
                        }
                    }   
                }
            }}
        ])
        res.json(resut)
    }
    else{
        res.json({message : "Who the heck are you?"})
    }
}

const delAllUser = async(req,res,next) => {
    try{
        const numberOfUser = await Users.countDocuments({$or : [{role : "consumer"}, {role: "provider"}]})
        if(numberOfUser == 0) throw new Error("no user") 
        await Users.deleteMany({$or : [{role : "consumer"}, {role :"provider"}]})
        await Products.deleteMany()
        res.json({
            message : `deleted ${numberOfUser} users`
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
    const userId = req.params.id
    const user = await Users.findById(userId)
    user.role = "admin"
    await user.save()
    res.json(user)
}

export {getAllUser, getOneUser,delAllUser, delOneUser, createAdmin} 