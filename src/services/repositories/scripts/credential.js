exports.get = `
  select * from credential 
    where user_id = %s`;

exports.save = `
    INSERT INTO credential 
      VALUES (%s, '{%s}', '{%s}', '%s');`

exports.update = `
    UPDATE credential set
      pwd = '{%s}',
      salt = '{%s}',
      pin = '%s'
    where user_id = %s;`