const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    tittle: { type: String, required: true },
    authorPhoto: { type: String, required: true },
    authorName: { type: String, required: true },
    likes: [{ like: { type: Number, default: 0 }, user: { type: mongoose.Types.ObjectId, required: true, ref: 'user' } }],
    duration: { type: Number, required: true },
    price: { type: Number, required: true, min: 1, max: 5 },
    hashTags: [{ type: String, required: true }],
    comments: [{ comment: { type: String, required: true }, user: { type: mongoose.Types.ObjectId, required: true, ref: 'user' } }],
    idCity: { type: mongoose.Types.ObjectId, ref: 'city', required: true }
})

const itinerary = mongoose.model('itinerary', itinerarySchema)

module.exports = itinerary