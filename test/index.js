const istanbul = require('istanbul-middleware');
const pg = require('pg');
let pool = new pg.Pool();

const url = require('url');
const express = require('express');

let router = express.Router();

router.use('/kill', () => {
  process.exit(0);
});

router.use('/coverage', istanbul.createHandler({verbose: true, resetOnGet: true}));

router.use('/data', (req, res) => {
  // check if path exists
  if (req.path === '/default') {
    pool.query(require('fs').readFileSync(`${__dirname}/data/default.sql`, 'utf8'), (err) => {
      if (err) return res.send({status: `error: ${err}`});
      res.send({status: 'success'});
    });
  } else {
    res.send({datasets: ['default']});
  }
});

router.use('/', (req, res) => {
  res.send({
    paths: [
      {'/kill': 'Terminates the service (used for CI routine)'},
      {'/coverage': 'View the current code coverage report'},
      {'/coverage/download': 'Download the code coverage report'},
      {'/data': 'Initialize datasets'}
    ]
  });
});

module.exports = (dir) => {
  istanbul.hookLoader(dir, {verbose: true});
  return router;
};