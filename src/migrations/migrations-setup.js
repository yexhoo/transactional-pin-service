const util = require("util")
const executor = require("./migrations-executor")
const scripts = require("./migrations-scripts")
const helper = require("./migrations-helper")

exports.createConfigs = () => executor
  .run(scripts.migrateCreate)
  .then(() => executor.select(scripts.getLastRun))

exports.saveLastRun = (file) => {

  const doesLastRunExist = util
    .format(scripts.doesLastRunExist, file.lastRun);

  const migration = util
    .format(scripts.insertLastRun, file.lastRun, helper.formatFile(file));

  return executor
    .select(doesLastRunExist)
    .then((rows) => {
      if (rows.length) { return; }
      return executor.run(migration)
    })
    .then(() => { return file })
};