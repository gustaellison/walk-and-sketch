const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourSchema = new Schema({
    name: String,
    duration: String,
    type: String,
    date: Date,
    time: String,
    image: String,
    trailName: String,
    distance: Number,
    description: String,
    medium: String,
    capacity: { type: Number, min: 0 },

}, { timestamps: true })

module.exports = mongoose.model("Tour", tourSchema)