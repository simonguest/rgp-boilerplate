const request = require('request');
/**
 * Apply Stub
 * @param  {string} stub Name of the stub
 * @param  {Function} done Function to execute when finished
 */
module.exports = (stub, done) => {
  request(`http://localhost:3003/stubs/${stub}`, (err, res, body) => {
    if (err) throw err;
    expect(body).to.contain('{"status":"success"}');
    done();
  });
};