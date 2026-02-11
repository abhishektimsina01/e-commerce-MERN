import {reviewSchema} from "../validation/validation.js"
import {Reviews} from "../models/reviews.js"
import mongoose from "mongoose"
import { Products } from "../models/product.js"

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
        const reviewId = req.params.id
        const data = req.body
        let review = await Reviews.findById(reviewId)
        Object.assign(review, data)
        review.save()
        res.json(review)
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

        // if it was the provider then i have to send all his/her product's reviews with the respoective product
        else if(req.user.role == "provider"){
            const providerId = req.user._id
            const product = await Products.find({productOwner : providerId})
            console.log(product)
            const productsId = product.map((prod)=>prod._id)
            console.log("the product is", productsId)
            console.log(productsId)
            const reviews  = await Reviews.aggregate([
                {$match : {product : {$in : productsId}}},
                {$lookup : {
                    from : "products",
                    localField : "product",
                    foreignField : "_id",
                    as : "product"
                }},
                {$unwind : "$product"},
                {$project : {
                    _id : 1,
                    user : 1,
                    product : {
                        _id : "$product._id",
                        name : "$product.name",
                    }
                }}
            ])
            // const reviews = await Reviews.findById(productId)
            res.json(reviews)  
        }
    }
    catch(err){
        next(err)
    }
}

export {makeReview,updateReview,deleteReview, getAllreview}