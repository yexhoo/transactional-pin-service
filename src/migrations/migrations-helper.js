exports.formatFile = (file) =>
    JSON.stringify(file, null, 2)

exports.formatValidFile =
    (lastRun) => lastRun.length ? this.formatFile(lastRun[0].file) : ""

exports.parseFile =
    (file) => JSON.parse(file)