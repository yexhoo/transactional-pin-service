exports.get = `
  select * from credential 
    where user_id = %s`;

exports.save = `
    INSERT INTO credential 
      VALUES (%s, '{%s}', '{%s}', '%s');`