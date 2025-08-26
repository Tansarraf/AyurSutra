import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Practitioner } from "../models/practitioner.model.js";

export const registerPractitioner = async (req, res) => {
    try {
        const { name, email, password, phone, specialization, bio, degrees = [] } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Name, Email and Password is required!!!" });
        }

        const user = await Practitioner.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists!!!" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new Practitioner({ name, email, password: hashed, phone, specialization, bio, degrees });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 24 * 60 * 60 * 1000 });

        return res.json({ success: true, message: "User registered successfully!!!", user: { _id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const loginPractitioner = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and Password is required!!!" });
        }

        const user = await Practitioner.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found!!!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid password!!!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 24 * 60 * 60 * 1000 });

        res.json({ success: true, message: "User logged in successfully!!!", user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

