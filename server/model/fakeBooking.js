const mongoose = require('mongoose')

const fakeBookingSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    items: [{
        year: { type: String },
        month: { type: String },
        date: [{ type: String }]
    }],
    information: { type: String },
    status: {
        type: String,
        default: 'Wait Confirmation'
    }
})

module.exports = mongoose.model('fakeBooking', fakeBookingSchema)