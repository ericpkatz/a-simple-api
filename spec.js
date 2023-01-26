const db = require('./db')
beforeAll(async()=> {
  await db.client.connect();
});
afterAll(async()=> {
  await db.client.end();
});
beforeEach(async()=> {
  await db.syncAndSeed();
});

it('1 === 1', ()=> {
  expect(1 === 1).toBe(true);
})
describe('getItems', ()=> {
  it('returns all items', async()=> {
    const items = await db.getThings();
    console.log(items);
  });
});
