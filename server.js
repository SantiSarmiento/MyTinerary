const express = require('express')
const passaport = require('passport')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const router = require('./routes/index')
require('./config/passport')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT

app.listen(port, host, () => console.log("App listening on port " + port + " on " + host))