const { Pool } = require('pg');

const singleton = {pool:null};

exports.init = () => {
    if( null === singleton.pool) {
        singleton.pool = new Pool({
          max: 10,
          connectionString: process.env.DATABASE_URL
        })
    }
    return singleton.pool;
}