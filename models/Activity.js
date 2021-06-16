const mongoose = require('mongoose')

const activitySchemma = new mongoose.Schema({
    activities: [{ tittle: { type: String, required: true }, photo: { type: String, required: true } }],
    idItinerary: { type: mongoose.Types.ObjectId, ref: 'itinerary', required: true }
})

const activity = mongoose.model('activity', activitySchemma)

module.exports = activity