// PostgreSql pool
const pg = require('pg');
let pool = new pg.Pool({database: 'postgres'});

// Express and GraphQL Middleware
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const resolvers = require('./resolvers');

// Authentication Strategy
const auth = require('./auth');
let fb = auth.facebook(app, {callbackURL: 'http://localhost:3002/auth/callback', clientID: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_SECRET});

// GraphQL schema
let schema = buildSchema(require('fs').readFileSync('./schema.graphqls', 'utf8'));
app.use('/graphql', graphqlHTTP({schema: schema, rootValue: resolvers.root(pool), graphiql: true}));

// Static webpack generated content
app.use('/static', express.static(`dist`));

// Auth required for admin route
app.use('/admin', fb.ensureAuthenticated);

// Default page
app.use('/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

// Start server on pool connection
pool.connect()
  .then(() => {
    app.listen(3002, function () {
      console.log('Server is listening on 3002');
      if (process.env.TEST_MODE === "1") {
        // run tests here
        console.log('Tests complete. Shutting down server.');
        process.exit(0);
      }
    });
  });