let controllers = {}
const configs = require('../config/config')
const config = configs.config()

controllers.ping = (req, res)=> {
    res.send("The server is up and running")
}

controllers.registerSeller = (req, res) => {

}

controllers.getSellers = (req, res) => {

}

module.exports = controllers