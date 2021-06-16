const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const user = require('../models/User')

module.exports = passport.use(new jwtStrategy({
//le decimos de donde sacar el token, que llega por cabeceras como baererl
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
//le decimos como interpretar usando la key o frase de seguridad
    secretOrKey: process.env.SECRET_OR_KEY
    
}, (payload, done) => {
    user.findById(payload._doc._id)
    .then(user => {
        if(!user) {
            return done(null,false)
        } else {
            return done(null, user)
        }
    })
    .catch(error => {
        return done(error, false)
    })
}))