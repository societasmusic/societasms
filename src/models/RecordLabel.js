// Require dependencies
import mongoose from "mongoose"

// Define object schema
const recordLabelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dpid: { type: String, required: false },
    isni: { type: String, required: false },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
}, { timestamps: true })

// Declare and export object model
const RecordLabel = mongoose.models.RecordLabel || mongoose.model("RecordLabel", recordLabelSchema)
export default RecordLabel