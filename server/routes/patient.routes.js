import express from "express";
import {getPatientData, loginPatient, registerPatient } from "../controllers/patient.controller.js";
import userAuth from "../middlewares/user.auth.js";

const patientRouter = express.Router();

patientRouter.post("/patient-register", registerPatient);
patientRouter.post("/patient-login", loginPatient);
patientRouter.get("/patient-data", userAuth, getPatientData);

export default patientRouter;