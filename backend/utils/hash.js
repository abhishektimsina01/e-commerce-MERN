import bcrypt from "bcryptjs";

export const hashPassword = async(password) =>{
    const salt = await bcrypt.genSalt(process.env.salt)
    return await bcrypt.hash(password, salt)
}

export const verifyPassword = async(hashedPassword, password) =>{
    return await bcrypt.compare(password, hashPassword)
}