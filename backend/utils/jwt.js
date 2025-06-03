//logIn and Signup
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken = (user) => {
    const accessToken  = jwt.sign({
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role        
    }, process.env.access_token, {expiresIn : "1d"})
    const refreshToken = jwt.sign({_id : user._id}, process.env.refresh_token, {expiresIn : "10d"})
    return {accessToken, refreshToken}
}

export {generateAccessAndRefreshToken}