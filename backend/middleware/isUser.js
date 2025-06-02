import { userLogInSchema } from "../validation/validation.js"
const isUser = async(req,res,next) =>{
    try{
        const err = userLogInSchema.validate(req.body)
        if(err){
            throw err
        }
        const {email , password} = req.body
        const user = await Users

    }
    catch(err){
        next(err)
    }
}