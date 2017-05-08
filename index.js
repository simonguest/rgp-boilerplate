if (process.env.NODE_ENV !== 'production') {
  require('./testbench')(`${__dirname}/server`, 3003);
}
require('./server').start(3002);
