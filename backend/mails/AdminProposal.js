//user
import {sendMail} from "../helpers/sendMail.js"

const signupMail = () => {
    const mailOptions = {
        subject : "Promoted to Admin",
        html : ``,
    }
    sendMail(mailOptions)
}