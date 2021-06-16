const itinerary = require('../models/Itinerary')

const itinerarysControllers = {
    getItinerarys: async (req, res) => {
        try {
            const allItinerarys = await itinerary.find()
            res.json({ success: true, response: allItinerarys })
        } catch (error) {
            res.json({ success: false, response: "Our servers are under maintenance." })
        }
    },

    getOneItinerarys: async (req, res) => {
        const idSearch = req.params.id
        try {
            const Itinerarys = await itinerary.findById(idSearch)
            res.json({ Itineraries: Itinerarys, success: true })
        } catch (error) {
            res.json({ success: false, response: "We did not find what you were looking for." })
        }
    },

    addItinerarys: async (req, res) => {
        try {
            const newItinerarys = new itinerary(req.body)
            await newItinerarys.save()
            const allItinerarys = await itinerary.find()
            res.json({ success: true, response: allItinerarys })
        } catch (error) {
            res.json({ success: false, response: "Check your Json." })
        }
    },

    deleteItinerarys: async (req, res) => {
        const idSearch = req.params.id
        try {
            const ItinerarysToDelete = await itinerary.findOneAndDelete({ _id: idSearch })
            res.json({ success: true, response: ItinerarysToDelete })
        } catch (error) {
            res.json({ success: false, response: error })
        }
    },

    modifyItinerarys: async (req, res) => {

        const itineraryId = req.params.id
        const user = req.user._id
        const message = req.body.message
        const newComment = { comment: message, user }

        try {
            const pushComment = await itinerary.findOneAndUpdate({ _id: itineraryId }, { $push: { comments: newComment } }, { new: true }).populate({
                path: 'comments',
                populate: { path: 'user' }
            })
            res.json({ success: true, response: pushComment })
        } catch (error) {
            res.json({ success: false, response: error })
        }
    },

    getItinerariesByCity: async (req, res) => {
        const id = req.params.idCity
        try {
            const itinerariesByCity = await itinerary.find({ idCity: id }).populate({
                path: 'comments',
                populate: { path: 'user' }
            })
            res.json({ success: true, response: itinerariesByCity })
        } catch (error) {
            res.json({ success: false, response: error })
        }
    },

    deleteMessage: async (req, res) => {
        const itineraryId = req.params.id
        const commentId = req.body.commentId
        try {
            const deleteComment = await itinerary.findOneAndUpdate({ _id: itineraryId }, { $pull: { comments: { _id: commentId } } }, { new: true }).populate({
                path: 'comments',
                populate: { path: 'user' }
            })
            res.json({ success: false, response: deleteComment })
        } catch (error) {
            res.json({ success: false, response: "Something went wrong, try again later." })
        }
    },

    editMessage: async (req, res) => {
        const comment = req.body.commentEdit
        const commentId = req.body.commentId
        try {
            const editedComment = await itinerary.findOneAndUpdate({ "comments._id": commentId }, { $set: { "comments.$.comment": comment } }, { new: true }).populate({
                path: 'comments',
                populate: { path: 'user' }
            })
            res.json({ success: true, response: editedComment })
        } catch {
            res.json({ success: false, response: "Something went wrong, try again later." })
        }
    },

    putLike: async (req, res) => {
        const itineraryId = req.params.id
        const userId = req.body.userId
        const userLiked = { user: userId }
        try {
            const newLike = await itinerary.findByIdAndUpdate({ _id: itineraryId }, { $push: { likes: userLiked } }, { new: true }).populate({
                path: 'comments',
                populate: { path: 'user' }
            })
            res.json({ succes: true, response: newLike })
        } catch (error) {
            res.json({ success: false, response: error })
        }
    },

    deleteLike: async (req, res) => {
        const itineraryId = req.params.id
        const userId = req.body.userId
        const userLiked = { user: userId }
        try {
            const newLike = await itinerary.findByIdAndUpdate({ _id: itineraryId }, { $pull: { likes: { user: userId } } }, { new: true }).populate({
                path: 'comments',
                populate: { path: 'user' }
            })
            res.json({ succes: true, response: newLike })
        } catch (error) {
            res.json({ success: false, response: error })
        }
    }
}

module.exports = itinerarysControllers