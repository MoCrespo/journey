import mongoose from "mongoose";

const JourneySchema = new mongoose.Schema({
    journey: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Journey = mongoose.model("Journey", JourneySchema)