import mongoose from "mongoose";

const practitionerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, default: "General Ayurveda" },
  bio: { type: String, default: "" },
  experienceYears: { type: Number, default: 0 },
  degrees: [{ type: String }],
  assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  appointments: [{
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    date: Date,
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
  }],
  ratings: [{
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    stars: { type: Number, min: 1, max: 5 },
    feedback: String,
    createdAt: { type: Date, default: Date.now }
  }]

}, { timestamps: true });

export const Practitioner = mongoose.model("Practitioner", practitionerSchema);
