const auth = require('../server/auth');
const server = require('../server');
sandbox.stub(auth(), 'isAuthenticated').callsFake(() => {
  return true;
});
sandbox.stub(auth(), 'isUnauthenticated').callsFake(() => {
  return false;
});
sandbox.stub(auth(), 'ensureAuthenticated').callsFake((req, res, next) => {
  next();
});
// restart the server as auth is bound to express context
server.stop();
server.start();