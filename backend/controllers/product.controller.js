import {productSchema} from "../validation/validation.js"
import {Products} from "../models/product.js"
import mongoose from "mongoose"
const getAllproduct = async(req,res,next) => {
    try{
        if(req.user.role == "provider"){
            const products = await Products.find({productOwner : req.user._id}).select("-productOwner -createdAt -updatedAt")
            const product = await Products.aggregate([
                {$match : {createdAt : {$lt : new Date(Date.now())}}},
                {$lookup : {
                    from : "reviews",
                    localField : "_id",
                    foreignField : "product",
                    as : "reviews"
                }},
                // {$project : {
                //     reviews : {
                //         $map : {
                //             input : "reviews",
                //             as : "review",
                //             in : {
                                
                //             }
                //         }
                //     }
                // }}
            ])
            res.json(product)
        }
        else if(req.user.role == "admin" || req.user.role == "superadmin"){
            console.log(req.user.role)
            const products = await Products.find().select("-createdAt -updatedAt ").populate("productOwner", "-_id -password -createdAt -updatedAt -role -address -refreshToken")
            res.json(products)
        }
        else{

        }
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
        if(!req.file.path == undefined){product.productImage = req.file.path}
        await product.save()
        res.json(product)
    }
    catch(err){
        next(err)
    }
}

const deleteProduct = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}

// const deleteOneProduct = async(req,res,next) => {
//     try{

//     }
//     catch(err){
//         next(err)
//     }
// }

const getOneProduct = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}

const updateProduct = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}


export {getAllproduct, createProduct, getOneProduct, deleteProduct, updateProduct}