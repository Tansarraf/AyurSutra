import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true }, // Hashed password
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },


  // Medical info
  bloodGroup: String,
  allergies: [String],
  medicalHistory: [String],
  currentMedications: [String],

  // Relations
  therapySessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "TherapySession" }],
  progress: [{ type: mongoose.Schema.Types.ObjectId, ref: "Progress" }],
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],

  createdAt: { type: Date, default: Date.now }
});

export const Patient = mongoose.model("Patient", patientSchema);
