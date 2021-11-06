const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const port = 9191

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

if (process.env.APP_ENV === "prod") {
    app.use('/enviro', express.static(path.join(__dirname, 'client', 'build')))
    app.get('/enviro/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

require('./app/routes/routes')(app)

app.listen(port, () => console.log(`Listening on port ${port}`))