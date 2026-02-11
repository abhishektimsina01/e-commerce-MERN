import {productSchema} from "../validation/validation.js"
import {Products} from "../models/product.js"
import {Reviews} from "../models/reviews.js"
import mongoose from "mongoose"
import { Orders } from "../models/orders.js"
import { outOfTheStock } from "../mails/OutOfStock.js"
const getAllproduct = async(req,res,next) => {
    try{
        if(req.user.role == "provider"){
                console.log(req.user)
                const product = await Products.aggregate([
                {$match : {productOwner : new mongoose.Types.ObjectId(req.user._id)}},
                {$project : {
                    name : 1,
                    price : 1,
                    brand : 1,
                    category : 1,
                    productImage : 1,
                    productOwner : 1
                }}
            ])
            res.json(product)
        }
        else if(req.user.role == "admin" || req.user.role == "superadmin" || req.user.role == "consumer"){
            console.log(req.user.role)
            const products = await Products.find().select("-createdAt -updatedAt -brand -state -stock -productOwner")
            res.json(products)
        }
    }
    catch(err){ 
        next(err)
    }
}

const getOneproduct = async(req,res,next) => {
    try{
        const productId = req.params.id
        const product = await Products.aggregate([
            {$match : {_id : new mongoose.Types.ObjectId(productId)}},
            {$lookup : {
                from : "reviews",
                localField : "_id",
                foreignField : "product",
                as : "reviews"
            }},
            {$lookup : {
                from : "users",
                localField : "productOwner",
                foreignField : "_id",
                as : "owner"    
            }},
            {$unwind : "$owner"},
            {$project : {
                _id : 1,
                name : 1,
                stock : 1,
                price : 1,
                brand : 1,
                category : 1,
                productImage: 1,
                reviews : {
                    $map : {
                        input : "$reviews",
                        as : "review",
                        in : {
                            _id : "$$review._id",
                            user : "$$review.user",
                            product : "$$review.product",
                            star : "$$review.star"
                            }
                        }
                    },
                owner : { 
                    _id : "$owner._id",
                    name : "$owner.name",
                    is_active : "$owner.isActive"
                    }
                }
            }
        ])
        res.json(product)
    }
    catch(err){
        next(err)
    }
}
const createProduct = async(req,res,next) => {
    try{
        //if the image of the product is uploaded then we can use the image as req.file.filename
        const {error} = productSchema.validate(req.body)
        if(error){
            throw error
        }
        const {name, description, stock, price, brand, state, category} = req.body
        const product = new Products({
            name,
            description,
            stock,
            price,
            state,
            brand,
            category,
        })
        product.productOwner = req.user._id
        product.productImage = "http://localhost:8000/env.jpg"
        await product.save()
        res.json(product)
    }
    catch(err){
        next(err)
    }
}


// if i remove the product then i also need to remove all the reviews to the product and also check if there are any prodcut on order
const deleteProduct = async(req,res,next) => {
    try{
        const productId = req.params.id
        const prodcut = await Products.findById(productId)
        const reviewsForTheProduct = await Reviews.find({product : productId})
        const ordersForTheProduct = await Orders.find({product : productId})
        const reviewsObject = reviewsForTheProduct.map(review => {
            return{
                _id : review._id,
                user : review.user,
                product : review.product,
                star : review.star
            }
        })
        const processedObject = {
            prodcut,
            reviewsObject,
            ordersForTheProduct
        }
        console.log(processedObject)

        // whe the user want to remove the specific product then we remove all the orders, revies and the product from our db
        await Products.findByIdAndDelete(productId)
        await Orders.deleteMany({product : productId})
        await Reviews.deleteMany({product : productId})
        outOfTheStock(prodcut.name)
        res.json({
            message : "product removed wit all the orders and the reviews to it"
        })
    }
    catch(err){
        next(err)
    }
}


const updateProduct = (req,res,next) => {
    try{
        const productId = req.params.id
        const product = Products.findById(productId)
        const data = req.body
        const new_Product = Object.assign(product, data)
        console.log(new_Product)
        res.json(productId)
    }
    catch(err){
        next(err)
    }
}


export {getAllproduct, getOneproduct, createProduct, deleteProduct, updateProduct}