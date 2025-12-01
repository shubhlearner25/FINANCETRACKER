// Ensure tests run in test mode
process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, server } = require('../server');
const User = require('../models/User');

let mongoServer;

// Spin up an in-memory MongoDB instance before running any tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.MONGO_URI = uri;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up after all tests finish
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

describe('Auth API Tests', () => {

  // Reset the database before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('creates a new user via signup', async () => {
    const newUser = {
      email: 'testuser@gmail.com',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/signup')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');

    const storedUser = await User.findOne({ email: newUser.email });
    expect(storedUser).not.toBeNull();
    expect(storedUser.defaultCurrency).toBe('USD');
    expect(storedUser.isSetupComplete).toBe(false);
  });

  it('allows user to complete their setup preferences', async () => {
    const userBody = {
      email: 'testuser@gmail.com',
      password: 'Password123!',
    };

    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send(userBody);

    const token = signupRes.body.token;

    const setupRes = await request(app)
      .put('/api/auth/setup')
      .set('Authorization', `Bearer ${token}`)
      .send({ defaultCurrency: 'EUR' });

    expect(setupRes.statusCode).toBe(200);
    expect(setupRes.body.defaultCurrency).toBe('EUR');
    expect(setupRes.body.isSetupComplete).toBe(true);

    const updated = await User.findOne({ email: userBody.email });
    expect(updated.defaultCurrency).toBe('EUR');
    expect(updated.isSetupComplete).toBe(true);
  });

  it('blocks access to setup API if no token is provided', async () => {
    const res = await request(app)
      .put('/api/auth/setup')
      .send({ defaultCurrency: 'EUR' });

    expect(res.statusCode).toBe(401);
  });

  it('returns an error if defaultCurrency is missing', async () => {
    const user = {
      email: 'testuser@gmail.com',
      password: 'Password123!',
    };

    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send(user);

    const token = signupRes.body.token;

    const res = await request(app)
      .put('/api/auth/setup')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Default currency is required');
  });

  it('does not allow duplicate email registration', async () => {
    const user = {
      email: 'duplicate@gmail.com',
      password: 'Password123!',
    };

    await request(app).post('/api/auth/signup').send(user).expect(201);

    const res = await request(app)
      .post('/api/auth/signup')
      .send(user)
      .expect(400);

    expect(res.body.message).toBe('User already exists');

    const count = await User.countDocuments({ email: user.email });
    expect(count).toBe(1);
  });

  it('rejects signup when email field is empty', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: '', password: 'Password123!' })
      .expect(400);

    expect(res.body.message).toBe('Please enter all fields');

    const users = await User.find({});
    expect(users.length).toBe(0);
  });

  it('rejects signup when password field is empty', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'user@example.com', password: '' })
      .expect(400);

    expect(res.body.message).toBe('Please enter all fields');

    const users = await User.find({});
    expect(users.length).toBe(0);
  });

});
