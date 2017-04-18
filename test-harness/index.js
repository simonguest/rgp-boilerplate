const istanbul = require('istanbul-middleware');
const url = require('url');
const express = require('express');
const app = express();

module.exports = (dir, port = 3003) => {
  istanbul.hookLoader(dir, {verbose: true});

  const datasets = require('./datasets');
  const behaviors = require('./behaviors');

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

  app.post('/behaviors/:behavior', (req, res) => {
    if (Object.keys(behaviors).indexOf(req.params.behavior) === -1) res.send({error: 'Not Found'});
    Object.keys(behaviors).map((behavior) => {
      if (behavior === req.params.behavior) {
        behaviors[behavior]()
          .then((status) => {
            return res.send({status: status});
          }, (err) => {
            return res.send({error: err});
          });
      }
    });
  });

  app.get('/behaviors', (req, res) => {
    res.send({behaviors: Object.keys(behaviors)});
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