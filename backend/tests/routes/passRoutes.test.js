const request = require('supertest');
const server = require('../../server');

describe('Pass Routes', () => {
  let passId;
  let passLevel = 5;

  it('should create a new pass', async () => {
    const res = await request(server)
      .post('/passes')
      .send({
        level: passLevel
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('level');
    expect(res.body).toHaveProperty('created_at');
    expect(res.body).toHaveProperty('updated_at');
    passId = res.body._id;
  });

  it('should get all passes', async () => {
    const res = await request(server).get(`/passes`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(typeof array);
    res.body.forEach(pass => {
      expect(pass).toHaveProperty('_id');
      expect(pass).toHaveProperty('level');
      expect(pass).toHaveProperty('created_at');
      expect(pass).toHaveProperty('updated_at');
    })
  });

  it('should get a pass by ID', async () => {
    const res = await request(server).get(`/passes/${passId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', passId);
    expect(res.body).toHaveProperty('level', passLevel);
  });

  it('should update a pass by ID', async () => {
    passLevel = 3;
    const res = await request(server)
      .put(`/passes/${passId}`)
      .send({
        level: passLevel
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', passId);
    expect(res.body).toHaveProperty('level', passLevel);
  });

  it('should delete a pass by ID', async () => {
    const res = await request(server).delete(`/passes/${passId}`);

    expect(res.statusCode).toBe(200);
  });

  it('should return 404 when trying to get a non-existent pass', async () => {
    const res = await request(server).get('/passes/non_existent_id');

    expect(res.statusCode).toBe(404);
  });
});