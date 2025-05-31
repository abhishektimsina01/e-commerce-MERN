import { transporter } from "../mails/nodemialer.js";

const sendMail = (mailoption) =>{
    transporter.sendMail(mailoption, (err, info) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log("email sent", info.response)
        }
    })
}

export {sendMail}