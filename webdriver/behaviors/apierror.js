const resolvers = require('../server/resolvers');
sandbox.stub(resolvers(), 'organizations').callsFake(() => {
  return new Promise((resolve, reject) => {
    reject('Database is unavailable.');
  });
});