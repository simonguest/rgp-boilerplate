const pg = require('pg');
let pool = new pg.Pool();

module.exports.apply = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve('success');
    });
  });
};
