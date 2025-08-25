import { Patient } from "../models/patient.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../configs/nodemailer.config.js";

// Patient Registration Controller Function
export const registerPatient = async (req, res) => {
    try {
        const {name, email, password, phone, age, gender} = req.body;

        if(!name || !email || !password || !phone || !age || !gender){
            return res.json({success: false, message: "Please provide all details..."});
        }

        const user = await Patient.findOne({email});

        if(user){
            return res.json({success: false, message: "User already exists..."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Patient.create({name, email, password: hashedPassword, phone, age, gender});

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie("token", token, {httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: process.env.NODE_ENV==="production" ? "none":"strict", maxAge: 24*60*60*1000});

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to AyurSutra – Your Wellness Journey Begins",
            html: `
                <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
                <h2 style="color:#2c7a7b;">Welcome to AyurSutra 🌿</h2>
                <p>Dear ${name || "User"},</p>
                
                <p>We’re delighted to welcome you to <strong>AyurSutra</strong> – your trusted companion for Panchakarma therapy and holistic wellness management.</p>
                
                <p>Your account has been successfully created with the email ID: <strong>${email}</strong>.</p>
                
                <h3 style="color:#2c7a7b;">What you can do with AyurSutra:</h3>
                <ul>
                    <li>📅 Schedule and track your Panchakarma therapy sessions with ease</li>
                    <li>🔔 Receive timely reminders for pre- and post-procedure precautions</li>
                    <li>📊 Monitor your recovery progress through personalized reports</li>
                    <li>💬 Share feedback and symptoms for better care</li>
                </ul>
                
                <p>We are committed to combining <em>traditional authenticity</em> with <em>modern efficiency</em> to support your wellness journey.</p>
                
                <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:support@ayursutra.com">support@ayursutra.com</a>.</p>
                
                <p style="margin-top:20px;">Wishing you health and wellness,</p>
                <p><strong>The AyurSutra Team</strong></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "You've registered successfully!!!"})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Patient Login Controller Function
export const loginPatient = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success: false, message: "Email and Password is required!!!"});
        }

        const user = await Patient.findOne({email});
        if(!user){
            return res.json({success: false, message: "User is not registerd!!!"});
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.json({success: false, message: "Invalid Password!!!"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie("token", token, {httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: process.env.NODE_ENV==="production" ? "none":"strict", maxAge: 24*60*60*1000});

        return res.json({success: true, message: "Login Successfull!!!"})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const logoutPatient = async (req, res)=>{
    try {
        res.clearCookie("token", {
            httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: process.env.NODE_ENV==="production" ? "none":"strict", maxAge: 24*60*60*1000
        })

        return res.json({success: true, message: "Logged Out"});
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const isPatientAuthenticated = async (req, res)=>{
    try {
        return res.json({success: true});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}