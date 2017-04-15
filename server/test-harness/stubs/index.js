const sinon = require('sinon');

const resolvers = require('../../../server/resolvers');
const auth = require('../../../server/auth');
const server = require('../../../server');

let organizationsStub = undefined;
let authStub = undefined;

module.exports.organizations = () => {
  return new Promise((resolve) => {
    if (organizationsStub) resolve('success'); // already applied
    organizationsStub = sinon.stub(resolvers(), "organizations").callsFake(() => {
      return new Promise((resolve, reject) => {
        reject("Database is unavailable.");
      });
    });
    resolve('success');
  });
};

module.exports.auth = () => {
  return new Promise((resolve) => {
    if (authStub) resolve('success'); // already applied
    authStub = sinon.stub(auth(), "isAuthenticated").callsFake(() => {
      return true;
    });
    // restart the server as auth is bound to express context
    server.stop();
    server.start();
    resolve('success');
  });
};

module.exports.reset = () => {
  return new Promise((resolve) => {
    if (organizationsStub) organizationsStub.restore();
    if (authStub) authStub.restore();
    resolve('success');
  });
};