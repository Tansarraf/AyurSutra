export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: "Logged Out" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Universal getUserData for any authenticated user (patient/practitioner/admin/hospital)
import { Patient } from "../models/patient.model.js";
import { Practitioner } from "../models/practitioner.model.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.json({ success: false, message: "User ID missing" });

        // Try fetching from Patient collection first
        let user = await Patient.findById(userId).lean();
        let role = "patient";

        if (!user) {
            // Try practitioner
            user = await Practitioner.findById(userId).lean();
            role = user ? "practitioner" : null;
        }

        // TODO: add Admin/Hospital models when available

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Normalize a minimal safe payload
        const safe = {
            _id: user._id,
            name: user.name || "User",
            email: user.email || "",
            phone: user.phone || "",
            role,
            createdAt: user.createdAt || user.created_at || undefined,
        };

        return res.json({ success: true, user: safe });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}