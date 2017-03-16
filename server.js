const fs = require('fs');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const resolvers = require('./resolvers');

const pg = require('pg');
let config = {
  database: 'postgres', //env var: PGDATABASE
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

let pool = new pg.Pool(config);
const app = express();
let schema = buildSchema(fs.readFileSync('schema.graphqls', 'utf8'));

app.use('/graphql', graphqlHTTP({schema: schema, rootValue: resolvers.root(pool), graphiql: true}));

pool.connect()
  .then(() => {
    app.listen(3002, function () {
      console.log('server is listening on 3002')
    })
  });
