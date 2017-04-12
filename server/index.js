// PostgreSql pool
const pg = require('pg');
let pool = new pg.Pool();

// Express and GraphQL Middleware
const express = require('express');
const app = express();
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const resolvers = require('./resolvers');

// Authentication Strategy
const auth = require('./auth');
let fb = auth.facebook(app, {callbackURL: 'http://localhost:3002/auth/callback', clientID: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_SECRET});

// GraphQL schema
let schema = buildSchema(require('fs').readFileSync('./server/schema.graphqls', 'utf8'));
router.use('/graphql', graphqlHTTP({schema: schema, rootValue: resolvers.root(pool), graphiql: true}));

// Static webpack generated content
router.use('/static', express.static(`dist`));

// Auth required for admin route
router.use('/admin', fb.ensureAuthenticated);

// Default page
router.use('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Start server on pool connection
module.exports = {
  start: (test) => {
    if (test) app.use('/test', test);
    app.use('/', router);

    pool.connect()
      .then(() => {
        app.listen(3002, function () {
          console.log('Server is listening on 3002');
        });
      });
  }
}