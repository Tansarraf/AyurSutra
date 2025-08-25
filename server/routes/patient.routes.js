import express from "express";
import { isPatientAuthenticated, loginPatient, logoutPatient, registerPatient } from "../controllers/patient.controller.js";
import userAuth from "../middlewares/user.auth.js";

const patientRouter = express.Router();

patientRouter.post("/patient-register", registerPatient);
patientRouter.post("/patient-login", loginPatient);
patientRouter.post("/patient-logout", logoutPatient);
patientRouter.get("/is-auth", userAuth, isPatientAuthenticated);  

export default patientRouter;