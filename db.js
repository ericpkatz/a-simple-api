const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/a_simple_db');


const getThings = async()=> {
  const response = await client.query('SELECT * from things');
  const things = response.rows.map(row => {
    return {...row, hasLongName: row.name.length > 3}
  });
}

const syncAndSeed = async()=> {
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
};

module.exports = {
  client,
  getThings,
  syncAndSeed
};
