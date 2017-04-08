// QE bootstrap process
let qe = process.env.NODE_ENV !== 'production' ? require('./qe')(__dirname) : undefined;
require('./server').start(qe)