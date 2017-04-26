const istanbul = require('istanbul-middleware');

const url = require('url');
const express = require('express');
const app = express();

module.exports = (dir, port = 3003) => {
  istanbul.hookLoader(dir, { verbose: true });

  const controls = require('./controls');
  const datasets = require('./datasets');
  const behaviors = require('./behaviors');
  const inspections = require('./inspections');

  app.get('/inspections/vitalsigns', inspections.vitalsigns.express);
  app.use('/inspections/coverage', istanbul.createHandler({ verbose: true, resetOnGet: true }));

  app.get('/controls', (req, res) => {
    res.send({ controls: Object.keys(controls) });
  });

  app.post('/controls/:control', (req, res) => {
    if (Object.keys(controls).indexOf(req.params.control) === -1) res.send({ error: 'Not Found' });
    Object.keys(controls).map((control) => {
      if (control === req.params.control) {
        controls[control]()
          .then((status) => {
            return res.send({ status: status });
          }, (err) => {
            return res.send({ error: err });
          });
      }
    });
  });

  app.get('/datasets', (req, res) => {
    res.send({ datasets: Object.keys(datasets) });
  });

  app.post('/datasets/:dataset', (req, res) => {
    if (Object.keys(datasets).indexOf(req.params.dataset) === -1) res.send({ error: 'Not Found' });
    Object.keys(datasets).map((dataset) => {
      if (dataset === req.params.dataset) {
        datasets[dataset]()
          .then((status) => {
            return res.send({ status: status });
          }, (err) => {
            return res.send({ error: err });
          });
      }
    });
  });

  app.get('/behaviors', (req, res) => {
    res.send({ behaviors: Object.keys(behaviors) });
  });

  app.post('/behaviors/:behavior', (req, res) => {
    if (Object.keys(behaviors).indexOf(req.params.behavior) === -1) res.send({ error: 'Not Found' });
    Object.keys(behaviors).map((behavior) => {
      if (behavior === req.params.behavior) {
        behaviors[behavior]()
          .then((status) => {
            return res.send({ status: status });
          }, (err) => {
            return res.send({ error: err });
          });
      }
    });
  });

  app.use('/', (req, res) => {
    res.send({
      paths: [
        { '/controls/terminate': 'Terminates the service (used for CI routine)' },
        { '/inspections/vitalsigns': 'View the vitalsigns for the running service' },
        { '/inspections/coverage': 'View the current code coverage report' },
        { '/inspectionsrs/coverage/download': 'Download the code coverage report' },
        { '/datasets': 'Load datasets' },
        { '/behaviors': 'Apply behaviors' }
      ]
    });
  });

  app.listen(port, function() {
    console.log(`Test Harness loaded on port ${port}`);
  });

  return true;
};
