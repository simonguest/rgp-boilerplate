const sinon = require('sinon');
let sandbox = sinon.sandbox.create();

module.exports.reset = () => {
  return new Promise((resolve) => {
    sandbox.restore();
    resolve('success');
  });
};

module.exports.apply = (stub) => {
  return new Promise((resolve) => {
    try {
      eval(stub); // eslint-disable-line no-eval
      resolve('success');
    } catch (e) {
      console.log(e);
      resolve(e.message);
    }
  });
};