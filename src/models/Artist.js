// Require dependencies
import mongoose from "mongoose"

// Define object schema
const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pro: { type: String, required: false },
    ipi: { type: Number, required: false },
    isni: { type: String, required: false },
    dspProfiles: {
        spotify: { type: String, required: false },
        applemusic: { type: String, required: false },
    },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
}, { timestamps: true })

// Declare and export object model
const Artist = mongoose.models.Artist || mongoose.model("Artist", artistSchema)
export default Artist