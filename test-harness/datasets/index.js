const pg = require('pg');
let pool = new pg.Pool();

let sql = (name) => {
  return require('fs').readFileSync(`${__dirname}/${name}.sql`, 'utf8');
};

module.exports.empty = () => {
  return new Promise((resolve, reject) => {
    pool.query(sql('empty'), (err) => {
      if (err) {
        return reject(`error: ${err}`);
      }
      resolve('success');
    });
  });
};

module.exports.typical = () => {
  return new Promise((resolve, reject) => {
    pool.query(sql('empty') + sql('typical'), (err) => {
      if (err) {
        return reject(`error: ${err}`);
      }
      resolve('success');
    });
  });
};
