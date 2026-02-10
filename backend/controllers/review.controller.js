import {reviewSchema} from "../validation/validation.js"
import {Reviews} from "../models/reviews.js"
import mongoose from "mongoose"

const makeReview = async(req,res,next) => {
    try{
        const productId = req.params.id
        const {error} = reviewSchema.validate(req.body)
        if(error) throw error
        const review = new Reviews({
            user : req.user._id,
            product : productId,
            content : req.body.content,
            star : req.body.star
        })
        await review.save()
        res.json(req.body)
    }
    catch(err){
        next(err)
    }
}
const updateReview = async(req,res,next) => {
    try{
        const id = req.params.id
        const {content, star} = req.body
        const review = await Reviews.findByIdAndUpdate(id, {
            
        })
    }
    catch(err){
        next(err)
    }
}
const deleteReview = async(req,res,next) => {
    try{
        const id = req.params.id
        await Reviews.findByIdAndDelete(id)
        res.json({
            message : "deleted"
        })
    }
    catch(err){
        next(err)
    }
}

const getAllreview = async(req,res,next) => {
    try{
        if(req.user.role == "consumer"){
            const userId = req.params.id
            const reviews = await Reviews.aggregate([
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