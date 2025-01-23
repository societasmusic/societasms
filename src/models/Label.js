// Require dependencies
import mongoose from "mongoose"

// Define object schema
const labelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dpid: { type: String, required: false },
    isni: { type: String, required: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User" },
}, { timestamps: true })

// Declare and export object model
export default Label = mongoose.Model("Label", labelSchema)