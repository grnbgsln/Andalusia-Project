const mongoose = require('mongoose')

const beritaArtikelSchema = new mongoose.Schema({
    title: { type: String },
    shortDesc: { type: String },
    longDesc: { type: Object },
    images: { type: String },
    create_by: { type: String, required: true },
    updated_by: { type: String, default: "none" }
})


module.exports = mongoose.model('beritaArtikel', beritaArtikelSchema)