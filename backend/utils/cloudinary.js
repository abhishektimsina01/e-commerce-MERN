import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name : process.env.cloudinary_name,
    api_key  : " ",
    api_secret : " "
})

export {cloudinary} 