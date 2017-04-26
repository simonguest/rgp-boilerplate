const vitalsigns = require('vitalsigns');
const vitals = new vitalsigns();

vitals.monitor('cpu');
vitals.monitor('mem', { units: 'MB' });
vitals.monitor('tick');

module.exports = {
  vitalsigns: vitals,
};
