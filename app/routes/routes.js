const controller = require('../controller/controller')

module.exports = (app) => {
    app.get('/api/v1/ping', controller.ping)
}