'use strict'

const executor = require("../src/migrations/migrations-executor")

module.exports.up = function (next) {

  const credential_create = `
  CREATE TABLE IF NOT EXISTS credential (
    user_id integer PRIMARY KEY,
    pwd integer[] NOT NULL,
    salt integer[] NOT NULL,
    pin varchar (100) NOT NULL
  )`;

  return executor
    .run(credential_create)
    .then(() => next())
}

module.exports.down = function (next) {
  next()
}