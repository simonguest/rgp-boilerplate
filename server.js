const express = require('express');
const graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

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

let schema = buildSchema(`
# Users in the system
type User {
  id: String! #required
  firstname: String
  lastname: String
}

type Result { 
  id: String
}

type Mutation {
  addUser(firstname: String, lastname:String): Result
}

type Query { 
  user: [User]
}
`);

let root = {
  user(){
    return new Promise((resolve, reject) => {
      pool.query('select * from users', (err, result) => {
        if (err) return reject(err);
        resolve(result.rows);
      });
    });
  },
  addUser(args){
    return new Promise((resolve, reject) => {
      pool.query(`insert into users(firstname, lastname) values(${args.firstname}, ${args.lastname}) RETURNING id`, (err, result) => {
        if (err) return reject(err);
        resolve({id: result.rows[0].id});
      });
    })
  }
};

app.use('/graphql', graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));

pool.connect()
  .then(() => {
    app.listen(3002, function () {
      console.log('server is listening on 3002')
    })
  });
