import Joi from "joi";

const userLogInSchema = Joi.object({
    email : Joi.string().email().trim().required(),
    password : Joi.string().required()
})

const userSignUpSchema = Joi.object({
    name : Joi.string().min(3).max(30).trim().required(),
    email : Joi.string().email().trim().required(),
    password : Joi.string().required(),
    address : Joi.string().required()
})


export {userLogInSchema, userSignUpSchema}