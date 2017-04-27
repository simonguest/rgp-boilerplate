const request = require('request');
const fs = require('fs');
/**
 * Apply Behavior
 * @param  {string} behavior Name of the stub
 * @param  {Function} done Function to execute when finished
 */
module.exports = (behavior, done) => {
	let options = {
		method: 'POST',
		headers: {
			'content-type': 'text/plain; charset=utf-8'
		},
		url: 'http://localhost:3003/behaviors',
		body: fs.readFileSync(`${__dirname}/../../behaviors/${behavior}.js`)
	};

    request(options, (err, res, body) => {
        if (err) throw err;
        expect(body).to.contain('{"status":"success"}');
        done();
    });
};