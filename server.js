const express = require('express');
const server = express();
const db = require('./db');
const client = db.client;

server.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await db.getThings());
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
    await db.syncAndSeed();
  }
  catch(ex){
    console.log(ex);
  }
});