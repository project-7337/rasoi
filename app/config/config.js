const conf = require('./config.json')

exports.config = () => {
    let env = process.env.APP_ENV || 'dev'
    env = env.toString()
    return conf[env]
}