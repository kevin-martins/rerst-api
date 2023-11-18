const request = require('supertest');
const express = require('express');
const { databaseConnection, databaseDisconnection } = require('../../helpers/databaseConnection');
let runningServer;
let server;

describe('Pass Routes', () => {
  beforeAll(async () => {
    Promise.all(
      [await databaseConnection('tests')]
    )
      .then(async () => {
        const app = express();
        app.use(express.json());
        const passRoutes = require('../../routes/passRoutes');
        app.use(passRoutes);
        runningServer = app.listen(8080, async () => {
          console.log(`server starts on port => 8080`);
        });
        server = await request(app);
      })
  });
  
  afterAll(async () => {
    await databaseDisconnection();
    await runningServer.close();
  });

  let passId;

  it('should create a new pass', async () => {
    const res = await server
      .post('/passes')
      .send({
        level: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('created_at');
    expect(res.body).toHaveProperty('updated_at');
    passId = res.body._id;
    expect(passId).toBeDefined();
  });

  it('should not create a new pass', async () => {
    const res = await Promise.all([
      server.post('/passes').send({ level: 6 }),
      server.post('/passes').send({ level: 0 }),
    ]);

    res.forEach(pass => expect(pass.statusCode).toBe(400));
    // expect(res.statusCode).toBe(400);
  });

  it('should get all passes', async () => {
    const res = await server.get(`/passes`);

    expect(res.statusCode).toBe(200);
    res.body.forEach(pass => {
      expect(pass).toHaveProperty('_id');
    })
  });

  it('should get a pass by ID', async () => {
    const res = await server.get(`/passes/${passId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', passId);
  });

  it('should update a pass by ID', async () => {
    const res = await server
      .put(`/passes/${passId}`)
      .send({
        level: 3
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', passId);
    expect(res.body).toHaveProperty('level');
    expect(res.body.created_at).not.toEqual(res.body.updated_at);
  });

  it('should not update a pass by ID', async () => {
    const res = await server
      .put(`/passes/${passId}`)
      .send({
        level: 30
      });

    expect(res.statusCode).toBe(400);
  });

  it('should delete a pass by ID', async () => {
    const res = await server.delete(`/passes/${passId}`);

    expect(res.statusCode).toBe(200);
  });

  it('should return 404 when trying to get, update or delete a non-existent pass', async () => {
    const res = await Promise.all([
      await server.get('/passes/none'),
      await server.put('/passes/none'),
      await server.delete('/passes/none'),
    ]);

    res.forEach(pass => expect(pass.statusCode).toBe(404));
  });
});