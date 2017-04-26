const auth = require('./auth');

let singleton = null;

let resolvers = (pool) => {
  singleton = singleton ? singleton : {
    organizations() {
      return new Promise((resolve, reject) => {
        pool.query('SELECT organizations.*, (SELECT COUNT(*) FROM users WHERE users.orgid = organizations.id) AS usercount FROM organizations', (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result.rows);
        });
      });
    },
    users(args) {
      return new Promise((resolve, reject) => {
        if (args.orgid) {
          pool.query('select users.id, firstname, lastname, organizations.name as organization from users inner join organizations on (organizations.id = users.orgid) where organizations.id = $1', [args.orgid], (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result.rows);
          });
        } else {
          pool.query('select users.id, firstname, lastname, organizations.name as organization from users inner join organizations on (organizations.id = users.orgid)', (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result.rows);
          });
        }
      });
    },
    addOrganization(args, req) {
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) {
          return reject('You need to be authenticated.');
        }
        pool.query('insert into organizations (name) values($1) RETURNING id;', [args.name], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve({ id: result.rows[0].id });
        });
      });
    },
    addUser(args, req) {
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) {
          return reject('You need to be authenticated.');
        }
        pool.query('insert into users (firstname, lastname, orgid) values($1, $2, $3) RETURNING id;', [args.firstname, args.lastname, args.orgid], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve({ id: result.rows[0].id });
        });
      });
    },
    renameUser(args, req) {
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) {
          return reject('You need to be authenticated.');
        }
        pool.query('update users set firstname=$1, lastname=$2 where id=$3 returning id, firstname, lastname;', [args.firstname, args.lastname, args.id], (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.rows.length !== 1) {
            return reject('Could not rename user with that id');
          }
          resolve(result.rows[0]);
        });
      });
    },
    removeUser(args, req) {
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) {
          return reject('You need to be authenticated.');
        }
        pool.query('delete from users where id=$1 returning id;', [args.id], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve({ id: result.rows[0].id });
        });
      });
    },
    renameOrganization(args, req) {
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) {
          return reject('You need to be authenticated.');
        }
        pool.query('update organizations set name=$1 where id=$2 returning id, name;', [args.name, args.id], (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.rows.length !== 1) {
            return reject('Could not rename organization with that id');
          }
          resolve(result.rows[0]);
        });
      });
    },
    removeOrganization(args, req) {
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) {
          return reject('You need to be authenticated.');
        }
        pool.query('delete from organizations where id=$1 returning id;', [args.id], (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.rows.length !== 1) {
            return reject('Could not remove organization with that id');
          }
          return resolve({ id: result.rows[0].id });
        });
      });
    }
  };
  return singleton;
};

module.exports = resolvers;
