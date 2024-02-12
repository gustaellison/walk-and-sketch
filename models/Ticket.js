const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    _tour: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true }
    }, { timestamps: true })


module.exports = mongoose.model("Ticket", ticketSchema)