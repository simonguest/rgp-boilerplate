// Test harness bootstrap process
let test = process.env.NODE_ENV !== 'production' ? require('./server/test-harness')(__dirname) : undefined;
require('./server').start(test);