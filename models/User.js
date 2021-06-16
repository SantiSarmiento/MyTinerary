const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    photoUrl: {type: String, required: true},
    country: {type: String, default: null},
    googleUser: {type: Boolean, default: false}
})

const user = mongoose.model('user', userSchema)

module.exports = user