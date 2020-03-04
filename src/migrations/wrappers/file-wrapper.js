const fs = require('fs');

exports.read = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            if (err) return reject(err)
            resolve(data)
        });
    })
}

exports.write = (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, function (err, data) {
            if (err) return reject(err)
            resolve(data)
        });
    })
}