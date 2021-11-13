let controllers = {}
const configs = require('../config/config')
const config = configs.config()
const bookingData = require('../data/bookingData.json')
const dishesData = require('../data/dishesData.json')
const restaurantData = require('../data/restaurantData.json')

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
controllers.getRestaurants = (req, res) => {
    res.json(restaurantData)
}
module.exports = controllers