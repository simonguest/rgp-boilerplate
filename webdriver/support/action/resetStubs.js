const request = require('request');
/**
 * Reset Stubs
 * @param  {Function} done Function to execute when finished
 */
module.exports = (done) => {
  request.post(`http://localhost:3003/stubs/reset`, (err, res, body) => {
    if (err) throw err;
    expect(body).to.contain('{"status":"success"}');
    done();
  });
};