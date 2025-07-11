import bcrypt from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()
export const hashPassword = async(password) =>{
    return await bcrypt.hash(password, 10)
}

export const verifyPassword = async(password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword)
}