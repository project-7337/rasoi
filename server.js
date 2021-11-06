const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const port = 9191

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

require('./app/routes/routes')(app)

app.listen(port, () => console.log(`Listening on port ${port}`))