import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    // Prefer cookie token, but also allow Authorization: Bearer <token>
    let token = req.cookies?.token;
    if (!token) {
        const authHeader = req.headers?.authorization || req.headers?.Authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken.id) {
            req.body = req.body || {};
            req.body.userId = decodedToken.id;
        } else {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default userAuth;