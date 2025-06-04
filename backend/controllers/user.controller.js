import {Users} from "../models/user.js"
const getProfile  = async(req,res,next) => {
    try{
        const user = await Users.aggregate([
            {$match : {_id : req.user._id}},
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
                _id : 1,
                email : 1,
                address : 1,
                orders : {
                    $map : {
                        input : "$orders",
                        as : "order",
                        in :{
                            _id : "$$order._id",
                            product : "$$order.product",
                            quantity : "$$order.quantity",
                            price : "$$order.price",
                            total : "$$order.total"
                        }
                    }
                },
                reviews : {
                    $map : {
                        input : "$reviews",
                        as : "review",
                        in : {
                            _id : "$$review._id",
                            product : "$$review.product",
                            content : "$$review.content",
                            star : "$$review.star"
                        }
                    }
                }
            }}
        ])
        res.json(user)
    }
    catch(err){
        next(err)
    }
}

const getOrders  = async(req,res,next) => {
    try{
        const userId = req.user._id
        const user = await Users.findById(userId).populate("products", "")
    }
    catch(err){
        
    }
}

export {getProfile}