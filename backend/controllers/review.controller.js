import {reviewSchema} from "../validation/validation.js"
import {Reviews} from "../models/reviews.js"
import mongoose from "mongoose"
const makeReview = (req,res,next) => {
    try{
        const productId = req.params.id
        const {error} = reviewSchema.validate(req.body)
        if(error) throw error
        res.json(req.body)
    }
    catch(err){
        next(err)
    }
}
const updateReview = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}
const deleteReview = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}

const getAllreview = async(req,res,next) => {
    try{
        if(req.user.role == "consumer"){
            const userId = req.params.id
            const reviews = Reviews.aggregate([
                {$match : {user : new mongoose.Types.ObjectId(userId)}},    
                {$lookup : {
                    from : "products",
                    localField : "product",
                    foreignField : "_id",
                    as : "product"
                }},
                // {$unwind : "product"},
                {$project : {
                    content : 1,
                    star : 1,
                    product : {
                        $map : {
                            input : "$product",
                            as : "pro",
                            in : {
                                name : "$$pro.name"
                            }
                        }
                    }
                }}
            ])
            res.json(reviews)
        }
        else if(req.user.role == "admin" || req.user.role == "superadmin"){
            const reviews = await Reviews.find()
            
        }
    }
    catch(err){
        next(err)
    }
}

export {makeReview,updateReview,deleteReview, getAllreview}