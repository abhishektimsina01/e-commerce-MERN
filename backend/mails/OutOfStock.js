import express from "express"
import {sendMail} from "../helpers/sendMail.js"

const outOfTheStock = (productName) => {
    const mailOptions = {
        subject : `${productName} was removed from the availability`,
        // html : ``,
    }
    sendMail(mailOptions)
}

export {outOfTheStock}