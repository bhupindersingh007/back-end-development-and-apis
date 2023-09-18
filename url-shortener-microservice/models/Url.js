const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    original_url: { type: String, required: true, unique: true },
    short_url: { type: String, required: true, unique: true },
})

const Url = mongoose.model('url', urlSchema)

module.exports = Url  