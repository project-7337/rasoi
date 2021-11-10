let controllers = {}
const configs = require('../config/config')
const config = configs.config()
const bookingData = require('../data/bookingData.json')

controllers.ping = (req, res)=> {
    res.send("The server is up and running")
}

controllers.registerSeller = (req, res) => {

}

controllers.getSellers = (req, res) => {

}

controllers.fetchBookings = (req, res) => {
    res.json(bookingData)
}

module.exports = controllers