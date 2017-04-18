const request = require('request');

/**
 * Load a Dataset
 * @param  {String}   dataset The Dataset to load
 * @param  {Function} done Function to execute when finished
 */
module.exports = (dataset, done) => {
    request.post(`http://localhost:3003/datasets/${dataset}`, (err, res, body) => {
        if (err) throw err;
        expect(body).to.contain('{"status":"success"}');
        done();
    });
};
