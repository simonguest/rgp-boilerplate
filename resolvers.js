let resolvers = function(){};

resolvers.prototype.root = (pool) => {
  return {
    users(){
      return new Promise((resolve, reject) => {
        pool.query('select * from users', (err, result) => {
          if (err) return reject(err);
          resolve(result.rows);
        });
      });
    },
    addUser(args){
      return new Promise((resolve, reject) => {
        pool.query(`insert into users(firstname, lastname) values('${args.firstname}', '${args.lastname}') RETURNING id;`, (err, result) => {
          if (err) return reject(err);
          resolve({id: result.rows[0].id});
        });
      })
    },
    renameUser(args){
      return new Promise((resolve, reject) => {
        pool.query(`update users set firstname='${args.firstname}', lastname='${args.lastname}' where id='${args.id}' returning id, firstname, lastname;`, (err, result) => {
          if (err) return reject(err);
          if (result.rows.length !== 1) return reject("Could not rename user with that id");
          resolve(result.rows[0]);
        });
      })
    },
    removeUser(args){
      return new Promise((resolve, reject) => {
        pool.query(`delete from users where id='${args.id}' returning id;`, (err, result) => {
          if (err) return reject(err);
          if (result.rows.length !== 1) return reject("Could not remove user with that id");
          resolve({id: result.rows[0].id});
        });
      })
    }
  };
};

module.exports = new resolvers();