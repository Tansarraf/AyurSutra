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

app.use(cors({ credentials: true, origin: ["https://ayursutra.onrender.com","http://localhost:5173"] }));
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