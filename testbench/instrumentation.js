const vitalsigns = require('vitalsigns');
const vitals = new vitalsigns(); // eslint-disable-line new-cap

vitals.monitor('cpu');
vitals.monitor('mem', { units: 'MB' });
vitals.monitor('tick');

module.exports = {
  vitalsigns: vitals,
};
