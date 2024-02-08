
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String },
    adminStatus: { type: Boolean, default: false }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)