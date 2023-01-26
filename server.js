const express = require('express');
const server = express();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/a_simple_db');

server.get('/api/things', async(req, res, next)=> {
  try {
    const response = await client.query('SELECT * from things');
    res.send(response.rows);
  }
  catch(ex){
    next(ex);
  }
})

const port = process.env.PORT || 3000;

server.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await client.connect();
    const SQL = `
      DROP TABLE IF EXISTS things;
      CREATE TABLE things(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20)
      );
      INSERT INTO things(name) VALUES('foo');
      INSERT INTO things(name) VALUES('bar');
      INSERT INTO things(name) VALUES('bazz');
    `;
    await client.query(SQL);
  }
  catch(ex){
    console.log(ex);
  }
});