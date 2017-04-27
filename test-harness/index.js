const istanbul = require('istanbul-middleware');

const pg = require('pg');
let pool = new pg.Pool();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

module.exports = (dir, port = 3003) => {
  istanbul.hookLoader(dir, { verbose: true });

  const controls = require('./controls');
  const behaviors = require('./behaviors');
  const instrumentation = require('./instrumentation');

  app.use(bodyParser.text({}));

  app.get('/instrumentation/vitalsigns', instrumentation.vitalsigns.express);
  app.use('/instrumentation/coverage', istanbul.createHandler({ verbose: true, resetOnGet: true }));

  app.get('/controls', (req, res) => {
    res.send({ controls: Object.keys(controls) });
  });

  app.post('/controls/:control', (req, res) => {
    if (Object.keys(controls).indexOf(req.params.control) === -1) {
      res.send({ error: 'Not Found' });
    }
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

  app.post('/dataset', (req, res) => {
    pool.query(req.body, (err) => {
      if (err) {
        return res.send({ error: err });
      }
      return res.send({ status: 'success' });
    });
  });

  app.get('/behaviors', (req, res) => {
    res.send({ behaviors: Object.keys(behaviors) });
  });

  app.post('/behaviors/:behavior', (req, res) => {
    if (Object.keys(behaviors).indexOf(req.params.behavior) === -1) {
      res.send({ error: 'Not Found' });
    }
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
        { '/instrumentation/vitalsigns': 'View the vitalsigns for the running service' },
        { '/instrumentation/coverage': 'View the current code coverage report' },
        { '/instrumentation/coverage/download': 'Download the code coverage report' },
        { '/dataset': 'Apply dataset' },
        { '/behaviors': 'Apply behaviors' }
      ]
    });
  });

  app.listen(port, () => {
    console.log(`Test Harness loaded on port ${port}`);
  });

  return true;
};
