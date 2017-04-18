const istanbul = require('istanbul-middleware');
const url = require('url');
const express = require('express');
const app = express();

module.exports = (dir, port = 3003) => {
  istanbul.hookLoader(dir, {verbose: true});

  const datasets = require('./datasets');
  const stubs = require('./stubs');

  app.use('/kill', () => {
    process.exit(0);
  });

  app.use('/coverage', istanbul.createHandler({verbose: true, resetOnGet: true}));

  app.post('/datasets/:dataset', (req, res) => {
    if (Object.keys(datasets).indexOf(req.params.dataset) === -1) res.send({error: 'Not Found'});
    Object.keys(datasets).map((dataset) => {
      if (dataset === req.params.dataset) {
        datasets[dataset]()
          .then((status) => {
            return res.send({status: status});
          }, (err) => {
            return res.send({error: err});
          });
      }
    });
  });

  app.get('/datasets', (req, res) => {
    res.send({datasets: Object.keys(datasets)});
  });

  app.post('/stubs/:stub', (req, res) => {
    if (Object.keys(stubs).indexOf(req.params.stub) === -1) res.send({error: 'Not Found'});
    Object.keys(stubs).map((stub) => {
      if (stub === req.params.stub) {
        stubs[stub]()
          .then((status) => {
            return res.send({status: status});
          }, (err) => {
            return res.send({error: err});
          });
      }
    });
  });

  app.get('/stubs', (req, res) => {
    res.send({stubs: Object.keys(stubs)});
  });

  app.use('/', (req, res) => {
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

  app.listen(port, function () {
    console.log(`Test Harness loaded on port ${port}`);
  });

  return true;
};