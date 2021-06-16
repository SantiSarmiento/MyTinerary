const user = require('../models/User');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {

    addUser: async (req, res) => {
        var { firstName, lastName, email, password, photoUrl, country, googleUser } = req.body

        const emailExist = await user.findOne({ email })

        var response;
        var error;
        var newUser;

        password = bcryptjs.hashSync(password, 10)

        if (!emailExist) {
            try {
                newUser = new user({ firstName, lastName, email, password, photoUrl, country, googleUser })
                await newUser.save()
                const token = jwt.sign({ ...newUser }, process.env.SECRET_OR_KEY)
                response = { token: token, firstName: newUser.firstName, photoUrl: newUser.photoUrl, lastName: newUser.lastName, email: newUser.email, _id: newUser._id}
            } catch (err) {
                error = "Something went wrong. Try again"

            }
        } else {
            error = "Email is already in use !"
        }

        res.json({
            success: !error ? true : false,
            response: response,
            error: error
        })
    },

    signInUser: async (req, res) => {
        const { email, password, googleUser } = req.body
        var response;
        var error;
        const userExist = await user.findOne({ email: email })
        if (userExist && userExist.googleUser === googleUser) {
            const correctPassword = bcryptjs.compareSync(password, userExist.password)
            if (correctPassword) {
                const token = jwt.sign({ ...userExist }, process.env.SECRET_OR_KEY)
                response = { token: token, photoUrl: userExist.photoUrl, firstName: userExist.firstName, lastName: userExist.lastName, email: userExist.email, _id: userExist._id }
            } else {
                error = "User and/or password are incorrect, try again !"
            }
        } else {
            error = "User and/or password are incorrect, try again !"
        }
        res.json({
            success: !error ? true : false,
            response: response,
            error: error
        })
    },

    forzedSignIn: async (req, res) => {
        res.json({ success: true, response: { photoUrl: req.user.photoUrl, firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email, _id: req.user._id} })
    },

    userData: async (req, res) => {
        const email = req.body.email
        const propsToModify = req.body.data
        const token = req.body.token
        const oldPassword = req.body.oldPassword

        if (oldPassword !== '') {
            const comparePassword = await user.findOne({ email: email })
            const compare = bcryptjs.compareSync(oldPassword.oldPassword, comparePassword.password)
            if (compare) {
                let password = propsToModify.password

                password = bcryptjs.hashSync(password, 10)
                const userUpadate = await user.findOneAndUpdate({ email: email }, { password }, { new: true })
                res.json({ success: true, response: userUpadate, token })
            }
        } else {
            const userUpadate = await user.findOneAndUpdate({ email: email }, { ...propsToModify }, { new: true })
            res.json({ success: true, response: userUpadate, token })
        }
    }
}

module.exports = userControllers