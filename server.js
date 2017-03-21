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

// Admin GraphQL schema
let adminSchema = buildSchema(require('fs').readFileSync('./graphql/admin.graphqls', 'utf8'));
app.use('/graphql/admin', fb.ensureAuthenticated, graphqlHTTP({schema: adminSchema, rootValue: resolvers.root(pool), graphiql: true}));

// Public (non-authenticated) GraphQL schema
let publicSchema = buildSchema(require('fs').readFileSync('./graphql/public.graphqls', 'utf8'));
app.use('/graphql', graphqlHTTP({schema: publicSchema, rootValue: resolvers.root(pool), graphiql: true}));

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
      console.log('server is listening on 3002')
    })
  });