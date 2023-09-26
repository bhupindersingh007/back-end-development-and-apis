const mongoose = require('mongoose')
const { Schema } = mongoose

const exerciseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref : 'user'},
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
})

const Exercise = mongoose.model('exercise', exerciseSchema)

module.exports = Exercise