const sinon = require('sinon');
let sandbox = sinon.sandbox.create();

const resolvers = require('../../server/resolvers');
const auth = require('../../server/auth');
const server = require('../../server');

module.exports.organizations_api_returns_error = () => {
  return new Promise((resolve) => {
    try {
      sandbox.stub(resolvers(), "organizations").callsFake(() => {
        return new Promise((resolve, reject) => {
          reject("Database is unavailable.");
        });
      });
      resolve('success');
    } catch (e) {
      resolve('wrapped');
    }
  });
};

module.exports.bypass_authentication = () => {
  return new Promise((resolve) => {
    try {
      sandbox.stub(auth(), "isAuthenticated").callsFake(() => {
        return true;
      });
      sandbox.stub(auth(), "isUnauthenticated").callsFake(() => {
        return false;
      });
      sandbox.stub(auth(), "ensureAuthenticated").callsFake((req, res, next) => {
        next();
      });
      // restart the server as auth is bound to express context
      server.stop();
      server.start();
      resolve('success');
    } catch (e) {
      resolve('wrapped');
    }
  });
};

module.exports.reset = () => {
  return new Promise((resolve) => {
    sandbox.restore();
    resolve('success');
  });
};