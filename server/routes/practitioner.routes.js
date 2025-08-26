import express from "express";
import { loginPractitioner, registerPractitioner } from "../controllers/practitioner.controller.js";

const practitionerRouter = express.Router();

practitionerRouter.post("/practitioner-register", registerPractitioner)
practitionerRouter.post("/practitioner-login", loginPractitioner)

export default practitionerRouter