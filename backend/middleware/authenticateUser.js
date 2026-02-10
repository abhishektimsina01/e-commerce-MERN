import jwt from "jsonwebtoken"
const authenticateUser = (req,res,next) => {
    try{
        const  {accessToken} = req.cookies
        const decoded_data = jwt.verify(accessToken, process.env.access_token)
        req.user = decoded_data
        console.log(req.user)
        next()
    }
    catch(err){
        next(err)
    }
}

export {authenticateUser}