// Requirements
const assert = require('assert');
assert(process.env.FACEBOOK_CLIENT_ID, 'FACEBOOK_CLIENT_ID env var required for authentication');
assert(process.env.FACEBOOK_SECRET, 'FACEBOOK_SECRET env var required for authentication');

// PostgreSql pool
const pg = require('pg');
let pool = new pg.Pool();

// Express and GraphQL Middleware
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');
let auth = require('./auth');

let server = null;

// Start server on pool connection
module.exports.start = (port = 3002) => {
  let app = express();

  // Authentication strategy
  auth(app, { callbackURL: 'http://localhost:3002/auth/callback', clientID: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_SECRET });

  // GraphQL schema
  let schema = buildSchema(require('fs').readFileSync('./server/schema.graphql', 'utf8'));
  app.use('/graphql', graphqlHTTP({ schema: schema, rootValue: resolvers(pool), graphiql: true }));

  // Static webpack generated content
  app.use('/static', express.static('client/static'));

  // Auth required for admin route
  app.use('/admin', auth().ensureAuthenticated);

  // Default page
  app.use('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  pool.connect((err) => {
    assert(!err, err);
    console.log(err ? err : 'Postgres pool has been started');
    server = app.listen(port, function () {
      console.log(`Server is listening on ${port}`);
    });
  });
};

module.exports.stop = () => {
  if (server) {
    server.close();
    console.log('Server is stopped');
  }
};
