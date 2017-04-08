const istanbul = require('istanbul-middleware');

const url = require('url');
const express = require('express');

let router = express.Router();

router.use('/kill', () => {
  process.exit(0);
});

router.use('/coverage', istanbul.createHandler({verbose: true, resetOnGet: true}));

router.use('/', (req, res) => {
  res.send({
    paths: [
      {'/kill': 'Terminates the service (used for CI routine)'},
      {'/coverage': 'View the current code coverage report'},
      {'/coverage/download': 'Download the code coverage report'}
    ]
  });
});

module.exports = (dir) => {
  istanbul.hookLoader(dir, {verbose: true});
  return router;
};