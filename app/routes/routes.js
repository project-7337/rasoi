const controller = require('../controller/controller')

module.exports = (app) => {
    app.get('/api/v1/ping', controller.ping)
    app.post('/api/v1/registerSeller', controller.registerSeller)
    app.get('/api/v1/getSellers', controller.getSellers)
    app.get('/api/v1/fetchBookings', controller.fetchBookings)
    app.get('/api/v1/fetchDishes', controller.fetchDishes)
}