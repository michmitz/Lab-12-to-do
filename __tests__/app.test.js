require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  beforeAll(done => {
    return client.connect(done);
  });

  beforeEach(() => {
    // TODO: ADD DROP SETUP DB SCRIPT
    execSync('npm run setup-db');
  });

  afterAll(done => {
    return client.end(done);
  });

  test('returns todos', async() => {

    const expectation = [
      {
        id: 1,
        todo: 'clean fridge',
        completed: false,
        owner_id: 1
      },
      {
        id: 2,
        todo: 'sweep',
        completed: false,
        owner_id: 1
      },
      {
        id: 3,
        todo: 'exercise',
        completed: false,
        owner_id: 1
      }
    ];

    const data = await fakeRequest(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
