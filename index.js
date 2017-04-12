// Test harness bootstrap process
let test = process.env.NODE_ENV !== 'production' ? require('./test')(__dirname) : undefined;
require('./server').start(test);