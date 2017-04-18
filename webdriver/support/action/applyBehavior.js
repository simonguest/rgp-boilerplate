const request = require('request');
/**
 * Apply Behavior
 * @param  {string} behavior Name of the stub
 * @param  {Function} done Function to execute when finished
 */
module.exports = (behavior, done) => {
  request.post(`http://localhost:3003/behaviors/${behavior}`, (err, res, body) => {
    if (err) throw err;
    expect(body).to.contain('{"status":"success"}');
    done();
  });
};