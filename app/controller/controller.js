let controllers = {}
const configs = require('../config/config')
const config = configs.config()
const bookingData = require('../data/bookingData.json')
const dishesData = require('../data/dishesData.json')

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

controllers.fetchDishes = (req, res) => {
    res.json(dishesData)
}

module.exports = controllers