const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    year: { type: String },
    stamp: [{
        month: { type: String },
        date: [{ type: String }]
    }]

})

module.exports = mongoose.model('Booking', BookingSchema)