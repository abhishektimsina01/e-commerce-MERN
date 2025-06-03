//user
import {sendMail} from "../helpers/sendMail.js"

const signupMail = () => {
    const mailOptions = {
        subject : "Welcome to ATO e-commerce",
        html : ``,
    }
    sendMail(mailOptions)
}