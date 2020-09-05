const db = require("../../src/database/connection");

let tables;

beforeAll(async () => {
  await db.migrate.latest();

  tables = (await db('sqlite_master').where('type', 'table'))
    .map(x => x.name)
    .filter(x => !x.startsWith('sqlite_') && !x.startsWith('knex_'));
});
  
afterEach(() => Promise.all(tables.map((table) => db(table).truncate())));

afterAll(() => db.destroy());