import mongoose from "mongoose";

const therapySessionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  practitionerId: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true },
  therapyType: { type: String, required: true }, // e.g., Vamana, Virechana
  scheduledDate: { type: Date, required: true },
  duration: { type: Number }, // in minutes/hours
  status: { type: String, enum: ["scheduled", "in-progress", "completed", "cancelled"], default: "scheduled" },
  notes: String,
  precautions: {
    preProcedure: [String],
    postProcedure: [String]
  }
});

export const TherapySession = mongoose.model("TherapySession", therapySessionSchema);
