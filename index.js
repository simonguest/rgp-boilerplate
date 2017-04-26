if (process.env.NODE_ENV !== 'production') {
  require('./test-harness')(`${__dirname}/server`, 3003);
}
require('./server').start(3002);
