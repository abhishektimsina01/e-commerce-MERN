import Joi from "joi";
import { startSession, STATES } from "mongoose";

const userLogInSchema = Joi.object({
    email : Joi.string().email().trim().required(),
    password : Joi.string().required()
})

const userSignUpSchema = Joi.object({
    name : Joi.string().min(3).max(30).trim().required(),
    email : Joi.string().email().trim().required(),
    password : Joi.string().required(),
    role : Joi.string().valid("consumer", "provider"),
    address : Joi.string().required()
}).unknown(true)

const productSchema = Joi.object({
    name : Joi.string().min(2).max(25).required(),
    description : Joi.string().max(100),
    stock : Joi.number().min(1).max(40).required(),
    price : Joi.number().required(),
    brand : Joi.string(),
    state : Joi.string().valid("new", "2nd hand").required(),
    category : Joi.string().valid("electronics", "clothing", "accessiories", "toys and games", "furnitures", "utensils", "equiment", "beauty products", "Pet and pet care").required()
})  

const reviewSchema = Joi.object({
    content : Joi.string().min(5).max(120),
    star : Joi.number().positive().valid(0, 0.5 ,1 ,1.5 ,2 ,2.5 ,3 ,3.5 ,4 ,4.5 ,5).required()
})

export {userLogInSchema, userSignUpSchema, productSchema, reviewSchema}