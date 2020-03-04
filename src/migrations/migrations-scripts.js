exports.migrateCreate = `
  CREATE TABLE IF NOT EXISTS migrate (
    lastRun varchar(100) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    file JSONb NOT NULL
  )`;

exports.getLastRun = `
  select * from migrate 
    where created_at = (
      select max(created_at) from migrate)`;

exports.insertLastRun = `
  INSERT INTO migrate(lastRun,file) 
    VALUES ('%s', '%s');`

exports.doesLastRunExist = `
  select * from migrate 
    where lastrun = '%s'`