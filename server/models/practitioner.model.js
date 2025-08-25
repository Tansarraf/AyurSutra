import mongoose from "mongoose";

const practitionerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  specialization: { type: String, required: true }, // Panchakarma, Ayurveda, etc.
  experienceYears: { type: Number, default: 0 },
  assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],

},{timestamps: true});

export const Practitioner = mongoose.model("Practitioner", practitionerSchema);
