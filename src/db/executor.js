const pool = require("./pool")

exports.run = (query) => {
  return pool.init().connect()
    .then(db => db.query(query).then(() => db))
    .then(db => db.release(true))
    .catch(err => { throw err })
};

exports.select = (query) => {
  let db, res;
  return pool.init().connect()
    .then(dataBase => { db = dataBase })
    .then(() => db.query(query))
    .then((r) => { res = r })
    .then(() => db.release(true))
    .then(() => { return res.rows })
    .catch(err => { throw err })
};