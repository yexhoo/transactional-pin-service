const migrate = require('migrate')

exports.load = (args) => {
    return new Promise((resolve, reject) => {
        migrate.load(args, function (err, data) {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

exports.up = (migrate) => {
    return new Promise((resolve, reject) => {
        migrate.up(function (err, data) {
            if (err) return reject(err)
            resolve(data)
        })
    })
}