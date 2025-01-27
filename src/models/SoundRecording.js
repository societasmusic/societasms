// Require dependencies
import mongoose from "mongoose"

// Define object schema
const soundRecordingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String, required: false },
    isrc: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    year: { type: String, required: true },
    genre: {
        primary: { type: String, required: true },
        secondary: { type: String, required: false },
    },
    lyrics: {
        language: { type: String, required: true },
        explicit: { type: Boolean, required: true },
        text: { type: String, required: false },
    },
    collaborators: [{
        artistId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Artist" },
        role: { type: String, required: true },
    }],
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
}, { timestamps: true })

// Declare and export object model
const SoundRecording = mongoose.models.SoundRecording || mongoose.model("SoundRecording", soundRecordingSchema)
export default SoundRecording