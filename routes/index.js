const express = require('express')
const router = express.Router()
const validator = require('../config/validator')
const passaport = require('passport')

const citiesControllers = require('../controllers/citiesControllers')
const itinerarysControllers = require('../controllers/itinerarysControllers')
const userControllers = require('../controllers/usersControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const passport = require('passport')

const { getCities, getOneCity, addCity, deleteCity, modifyCity } = citiesControllers
const { getItinerarys, getOneItinerarys, addItinerarys, deleteItinerarys, modifyItinerarys, getItinerariesByCity, deleteMessage, editMessage, putLike, deleteLike } = itinerarysControllers
const { addUser, signInUser, forzedSignIn, userData } = userControllers
const { addActivity, getActivities, getActivitiesByItinerary } = activitiesControllers

//cities
router.route('/cities')
    .get(getCities)
    .post(addCity)

router.route('/cities/:id')
    .get(getOneCity)
    .delete(deleteCity)
    .put(modifyCity)

// ITINERARIES
router.route('/itineraries')
    .get(getItinerarys)
    .post(addItinerarys)

router.route('/itinerary/:id')
    .get(getOneItinerarys)
    .delete(deleteItinerarys)
    .put(passport.authenticate('jwt', { session: false }), modifyItinerarys)

router.route('/itineraries/:idCity')
    .get(getItinerariesByCity)

router.route('/itinerary/comments/:id')
    .put(passaport.authenticate('jwt', { session: false }), deleteMessage)

router.route('/itinerary/comment/:id')
    .put(passaport.authenticate('jwt', { session: false }), editMessage)

router.route('/itinerary/like/:id')
    .put(putLike)

router.route('/itinerary/deleteLike/:id')
    .put(deleteLike)

// user
router.route('/user/signup')
    .post(validator, addUser)

router.route('/user/signin')
    .post(signInUser)

router.route('/user/signinLs')
    .get(passaport.authenticate('jwt', { session: false }), forzedSignIn)

router.route('/user/userdata')
    .put(userData)

// activities
router.route('/activities')
    .post(addActivity)
    .get(getActivities)

router.route('/activities/:idItinerary')
    .get(getActivitiesByItinerary)

module.exports = router