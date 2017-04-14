const sinon = require('sinon');

const resolvers = require('../../server/resolvers');

let organizationsStub = undefined;

module.exports.organizations = () => {
  return new Promise((resolve) => {
    organizationsStub = sinon.stub(resolvers(), "organizations").callsFake(() => {
      return new Promise((resolve, reject) => {
        reject("Database is unavailable.");
      });
    });
    resolve('success');
  });
};

module.exports.reset = () => {
  return new Promise((resolve) => {
    if (organizationsStub) organizationsStub.restore();
    resolve('success');
  });
};