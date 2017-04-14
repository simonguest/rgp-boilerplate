const istanbul = require('istanbul-middleware');
const url = require('url');
const express = require('express');

const datasets = require('./datasets');
const stubs = require('./stubs');

let router = express.Router();

router.use('/kill', () => {
  process.exit(0);
});

router.use('/coverage', istanbul.createHandler({verbose: true, resetOnGet: true}));

router.use('/datasets', (req, res) => {
  if (Object.keys(datasets).indexOf(req.path.replace('/', '')) === -1) res.send({datasets: Object.keys(datasets)});
  Object.keys(datasets).map((dataset) => {
    if (req.path === `/${dataset}`) {
      datasets[dataset]()
        .then((status) => {
          return res.send({status: status});
        }, (err) => {
          return res.send({error: err});
        });
    }
  });
});

router.use('/stubs', (req, res) => {
  if (Object.keys(stubs).indexOf(req.path.replace('/', '')) === -1) res.send({stubs: Object.keys(stubs)});
  Object.keys(stubs).map((stub) => {
    if (req.path === `/${stub}`) {
      stubs[stub]()
        .then((status) => {
          return res.send({status: status});
        }, (err) => {
          return res.send({error: err});
        });
    }
  });
});

router.use('/', (req, res) => {
  res.send({
    paths: [
      {'/kill': 'Terminates the service (used for CI routine)'},
      {'/coverage': 'View the current code coverage report'},
      {'/coverage/download': 'Download the code coverage report'},
      {'/datasets': 'Initialize datasets'},
      {'/stubs': 'Initialize stubs'}
    ]
  });
});

module.exports = (dir) => {
  istanbul.hookLoader(dir, {verbose: true});
  return router;
};