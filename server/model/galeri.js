const mongoose = require('mongoose')

const galeriSchema = new mongoose.Schema({
    title: { type: String, required: true },
    images: [
        {
            _id: { type: String },
            url: { type: String },
        },
    ],
    create_by: { type: String, required: true },
    updated_by: { type: String, required: true, default: "none" }
})

module.exports = mongoose.model('galeri', galeriSchema)