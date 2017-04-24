const auth = require('./auth');

let singleton = undefined;

let resolvers = (pool) => {
  singleton = singleton ? singleton : {
    organizations(){
      return new Promise((resolve, reject) => {
        pool.query('select * from organizations', (err, result) => {
          if (err) return reject(err);
          resolve(result.rows);
        });
      });
    },
    users(args){
      let orgQuery = args.orgid ? `where organizations.id = '${args.orgid}'` : '';
      return new Promise((resolve, reject) => {
        pool.query(`select users.id, firstname, lastname, organizations.name as organization from users inner join organizations on (organizations.id = users.orgid) ${orgQuery};`, (err, result) => {
          if (err) return reject(err);
          resolve(result.rows);
        });
      });
    },
    addOrganization(args, req){
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) return reject("You need to be authenticated.");
        pool.query(`insert into organizations (name) values('${args.name}') RETURNING id;`, (err, result) => {
          if (err) return reject(err);
          resolve({id: result.rows[0].id});
        });
      })
    },
    addUser(args, req){
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) return reject("You need to be authenticated.");
        pool.query(`insert into users (firstname, lastname, orgid) values('${args.firstname}', '${args.lastname}', '${args.orgid}') RETURNING id;`, (err, result) => {
          if (err) return reject(err);
          resolve({id: result.rows[0].id});
        });
      })
    },
    renameUser(args, req){
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) return reject("You need to be authenticated.");
        pool.query(`update users set firstname='${args.firstname}', lastname='${args.lastname}' where id='${args.id}' returning id, firstname, lastname;`, (err, result) => {
          if (err) return reject(err);
          if (result.rows.length !== 1) return reject("Could not rename user with that id");
          resolve(result.rows[0]);
        });
      })
    },
    renameOrganization(args, req){
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) return reject("You need to be authenticated.");
        pool.query(`update organizations set name='${args.name}' where id='${args.id}' returning id, name;`, (err, result) => {
          if (err) return reject(err);
          if (result.rows.length !== 1) return reject("Could not rename organization with that id");
          resolve(result.rows[0]);
        });
      })
    },
    removeOrganization(args, req){
      return new Promise((resolve, reject) => {
        if (auth().isUnauthenticated(req)) return reject("You need to be authenticated.");
        pool.query(`delete from organizations where id='${args.id}' returning id;`, (err, result) => {
          if (err) return reject(err);
          if (result.rows.length !== 1) return reject("Could not remove organization with that id");
          resolve({id: result.rows[0].id});
        });
      })
    }
  };
  return singleton;
};

module.exports = resolvers;