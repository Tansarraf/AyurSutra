import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.config.js";
import patientRouter from "./routes/patient.routes.js";
import cookieParser from "cookie-parser";
import commonRouter from "./routes/common.routes.js";
import practitionerRouter from "./routes/practitioner.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// CORS: allow provided frontend origin(s) and localhost; credentials for cookies
const allowedOrigins = [
    process.env.FRONTEND_ORIGIN, // e.g., https://ayursutra.vercel.app
    "https://ayur-sutra-theta.vercel.app",
    "http://localhost:5173"
].filter(Boolean);

app.set('trust proxy', 1);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow server-to-server / curl
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to AyurSutra");
})
app.use("/api/auth", patientRouter);
app.use("/api/common", commonRouter);
app.use("/api/auth", practitionerRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})