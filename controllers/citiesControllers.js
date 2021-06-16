const City = require('../models/City')


const citiesControllers = {
    getCities: async (req, res) => {
        try {
            const allCities = await City.find()
            res.json({ success: true, cities: allCities })
        } catch (error) {
            res.json({ succes: false, response: "Our servers are under maintenance." })
        }
    },

    getOneCity: async (req, res) => {
        const idSearch = req.params.id
        try {
            const city = await City.findById(idSearch)
            res.json({ city: city, succes: true })
        } catch (error) {
            res.json({ succes: false, response: "We did not find what you were looking for." })
        }
    },

    addCity: async (req, res) => {
        const { name, photo, country } = req.body
        try {
            const newCity = new City({ name: name, photo: photo, country: country })
            await newCity.save()
            const allCities = await City.find()
            res.json({ succes: true, response: allCities })
        } catch (error) {
            res.json({ succes: false, response: "Our servers are under maintenance." })
        }
    },

    deleteCity: async (req, res) => {
        const idSearch = req.params.id
        try {
            const cityToDelete = await City.findOneAndDelete({ _id: idSearch })
            res.json({ succes: true, response: cityToDelete })
        } catch (error) {
            res.json({ succes: false, response: error })
        }
    },

    modifyCity: async (req, res) => {
        const idSearch = req.params.id
        const propsToModify = req.body
        try {
            const cityToModify = await City.findOneAndUpdate({ _id: idSearch }, { ...propsToModify }, { new: true })
            res.json({ succes: true, response: cityToModify })
        } catch (error) {
            res.json({ succes: false, response: error })
        }
    }
}

module.exports = citiesControllers