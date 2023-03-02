const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    midtrans: { type: Array }
})

module.exports = mongoose.model('test', testSchema)