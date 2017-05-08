const istanbul = require('istanbul-middleware');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

module.exports = (dir, port = 3003) => {
  istanbul.hookLoader(dir, { verbose: true });

  const controls = require('./controls');
  const behaviors = require('./behaviors');
  const data = require('./data');
  const instrumentation = require('./instrumentation');

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

  app.post('/data', bodyParser.text(), (req, res) => {
    data.apply(req.body)
      .then((status) => {
        return res.send({ status: status });
      }, (err) => {
        return res.send({ error: err });
      });
  });

  app.use('/behaviors/reset', (req, res) => {
    behaviors.reset()
      .then((status) => {
        return res.send({ status: status });
      }, (err) => {
        return res.send({ error: err });
      });
  });

  app.post('/behaviors', bodyParser.text(), (req, res) => {
    behaviors.apply(req.body)
      .then((status) => {
        return res.send({ status: status });
      }, (err) => {
        return res.send({ error: err });
      });
  });

  app.use('/', (req, res) => {
    res.send({
      paths: [
        { '/controls/terminate': 'Terminates the service (used for CI routine)' },
        { '/instrumentation/vitalsigns': 'View the vitalsigns for the running service' },
        { '/instrumentation/coverage': 'View the current code coverage report' },
        { '/instrumentation/coverage/download': 'Download the code coverage report' },
        { '/data': 'Apply data' },
        { '/behaviors': 'Apply behaviors' },
        { '/behaviors/reset': 'Reset behaviors' }
      ]
    });
  });

  app.listen(port, () => {
    console.log(`Test Harness loaded on port ${port}`);
  });

  return true;
};
