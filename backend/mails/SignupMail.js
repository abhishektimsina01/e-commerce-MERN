import {sendMail} from "../helpers/sendMail.js"

const signupMail = (name) => {
    const mailOptions = {
        from : "timsinaabhihek1@gmail.com",
        to : "timsinaabhishek1@gmail.com",
        subject : "Welcome to ATO e-commerce",
        html : `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f0f4f8;
        font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
        color: #333;
      }
      .email-wrapper {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      }
      .email-header {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }
      .email-content {
        padding: 40px 30px;
        text-align: center;
      }
      .email-content h2 {
        font-size: 24px;
        color: #4f46e5;
        margin-bottom: 20px;
      }
      .email-content p {
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 20px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #999;
        padding: 20px;
        background-color: #f9fafb;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1>Welcome to <b>ATO e-commerce</b> 🎉</h1>
      </div>
      <div class="email-content">
        <h2>Hello, <b>${name}</b>!</h2>
        <p>
          We're so excited to have you here. Thank you for joining our vibrant
          community — you're officially part of something amazing!
        </p>
        <p>
          Explore, connect, and make the most of your experience. We’re glad
          you’re with us!
        </p>
        <p style="margin-top: 30px; color: #6b7280;">
          – The <b>The ATO</b> Team
        </p>
      </div>
      <div class="footer">
        &copy; 2025 The ATO. All rights reserved.
      </div>
    </div>
  </body>
</html>
`,
    }
    sendMail(mailOptions)
}

export {signupMail}