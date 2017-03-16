let resolvers = function(){};

resolvers.prototype.root = (pool) => {
  return {
    user(){
      return new Promise((resolve, reject) => {
        pool.query('select * from users', (err, result) => {
          if (err) return reject(err);
          resolve(result.rows);
        });
      });
    },
    addUser(args){
      return new Promise((resolve, reject) => {
        pool.query(`insert into users(firstname, lastname) values(${args.firstname}, ${args.lastname}) RETURNING id`, (err, result) => {
          if (err) return reject(err);
          resolve({id: result.rows[0].id});
        });
      })
    }
  };
};

module.exports = new resolvers();