// PostgreSql pool
const pg = require('pg');
let pool = new pg.Pool();

// Express and GraphQL Middleware
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const resolvers = require('./resolvers');
let auth = require('./auth');

// Server and test harness
let server = undefined;
const testHarness = require('./test-harness')(__dirname);

// Start server on pool connection
module.exports.start = () => {

  let app = express();
  let router = express.Router();

  // Authentication strategy
  auth(app, {callbackURL: 'http://localhost:3002/auth/callback', clientID: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_SECRET});

  // GraphQL schema
  let schema = buildSchema(require('fs').readFileSync('./server/schema.graphqls', 'utf8'));
  router.use('/graphql', graphqlHTTP({schema: schema, rootValue: resolvers(pool), graphiql: true}));

  // Static webpack generated content
  router.use('/static', express.static(`dist`));

  // Auth required for admin route
  router.use('/admin', auth().ensureAuthenticated);

  // Default page
  router.use('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  if (process.env.NODE_ENV !== 'production') app.use('/test', testHarness);
  app.use('/', router);

  pool.connect()
    .then(() => {
      server = app.listen(3002, function () {
        console.log('Server is listening on 3002');
      });
    });
};

module.exports.stop = () => {
  if (server) server.close();
};