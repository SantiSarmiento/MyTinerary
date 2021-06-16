const activity = require('../models/Activity')

const activitiesControllers = {
    addActivity: async (req, res) => {
        try {
            const newActivity = new activity(req.body)
            newActivity.save()
            const allActivity = await activity.find()
            res.json({ success: true, response: allActivity })
        } catch(error) {
            res.json({ success: false, response: error })
        }
    },

    getActivities: async (req, res) => {
        try {
            const allActivity = await activity.find()
            res.json({ success: true, response: allActivity })
        }
        catch(error) {
            res.json({ succes: false, response: error })
        }
    },

    getActivitiesByItinerary: async (req, res) => {
        const idSearch = req.params.idItinerary
        try{
            const activitiesByItinerary = await activity.findOne({idItinerary: idSearch})
            res.json({success: true, response: activitiesByItinerary})
        }catch(error){
            res.json({success: false, response: error})
        }
    }
}

module.exports = activitiesControllers