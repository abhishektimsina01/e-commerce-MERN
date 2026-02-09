import {productSchema} from "../validation/validation.js"
import {Products} from "../models/product.js"
import mongoose from "mongoose"
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
            {$project:
                {}
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

const deleteProduct = async(req,res,next) => {
    try{
        const userId = req.params.id
        res.json(userId)
    }
    catch(err){
        next(err)
    }
}

const deleteOneProduct = async(req,res,next) => {
    try{
        const userId = req.params.id
        res.json(userId)
    }
    catch(err){
        next(err)
    }
}


const updateProduct = (req,res,next) => {
    try{
        const userId = req.params.id
        res.json(userId)
    }
    catch(err){
        next(err)
    }
}


export {getAllproduct, getOneproduct, createProduct, deleteProduct, updateProduct}