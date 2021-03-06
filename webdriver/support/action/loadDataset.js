const request = require('request');
const fs = require('fs');

/**
 * Load a Dataset
 * @param  {String}   dataset The Dataset to load
 * @param  {Function} done Function to execute when finished
 */
module.exports = (dataset, done) => {
	let options = {
		method: 'POST',
		headers: {
			'content-type': 'text/plain; charset=utf-8'
		},
		url: 'http://localhost:3003/data',
		body: fs.readFileSync(`${__dirname}/../../data/${dataset}.sql`).toString()
	};

    request(options, (err, res, body) => {
        if (err) throw err;
        expect(body).to.contain('{"status":"success"}');
        done();
    });
};
