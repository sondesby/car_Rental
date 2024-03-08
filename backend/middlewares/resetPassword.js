require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require('../models/user');
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const Config = require("../models/config")
const templateHtml = fs.readFileSync("./templates/resetPassword.html", "utf-8");

//Forgot Password Mail
exports.forgotPassword = async(req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        const config = await Config.findOne({configname : "nodemailer"});
        if (!user) {
            return res.status(404).json({ message: "No account found with this email" });
        }
        if (!config) {
            return res.status(500).json({ message: "Failed to get config" });
        }
        const token = jwt.sign({ id: user._id }, process.env.FORGOT_PASS_KEY, {
            expiresIn: "1d",
        });
        
        transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: true,
            auth: {
              user: config.auth.user,
              pass: config.auth.password,
            },
        });
        
        const mailOptions = {
            from: {
              name: config.name,
              address: config.auth.user,
            },
            to: req.body.email,
            subject: "Recovery password",
            html: templateHtml.replace(
              'href="http://localhost:3000/reset-password"',
              `href="http://localhost:3000/reset-password?token=${token}"`
            ),
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending the email" });
            }
            console.log("Email sent:", info.response);
            return res.status(200).json({ message: "Email has been sent successfully", user: user });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error sending the email" });
    }
}

//reset password
exports.resetPass = async (req, res) => {
    const { newPassword } = req.body;
    const { userId } = req;
    if (!newPassword) {
      return res.status(404).json({ message: "New password is required" });
    }
  
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, {password : hashedPassword}, { new: true })
        res
            .status(200)
            .json({ message: "The password has been reset successfully" });
        } catch (error) {
        res.status(500).json({ message: "Password rest failed" });
        }
  };