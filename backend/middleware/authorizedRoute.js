//throw 403 (forbidden)
const authorizeUser = (...role) => {
    return (req,res,next) => {
        if(!role.includes(req.user.role)){
            const err = new Error("unAuthoriazed")
            err.status = 403
            next(err)
        }
        else{
            next()
        }
    }
}
export {authorizeUser}