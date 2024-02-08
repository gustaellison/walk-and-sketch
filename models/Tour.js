const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourSchema = new Schema({
    name: String,
    duration: {
        hours: Number,
        minutes: Number
    }, 
    image: String,
    trailName: String,
    distance: Number,
    description: String,
    medium: String

},{timestamps:true})

module.exports = mongoose.model("Tour", tourSchema)