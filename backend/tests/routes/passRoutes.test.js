const request = require('supertest');
const app = require('../../server');

describe('Pass Routes', () => {
  beforeAll(() => {
    //check mongodb connection
  })
  afterAll(() => {
    //close mongodb 
  })
  let passId;

  it('should create a new pass', async () => {
    const res = await request(app)
      .post('/passes')
      .send({
        level: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('created_at');
    expect(res.body).toHaveProperty('updated_at');
    passId = res.body._id;
  });

  it('should get all passes', async () => {
    const res = await request(app).get(`/passes`);

    expect(res.statusCode).toBe(200);
    res.body.forEach(pass => {
      expect(pass).toHaveProperty('_id');
    })
  });

  it('should get a pass by ID', async () => {
    const res = await request(app).get(`/passes/${passId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', passId);
  });

  it('should update a pass by ID', async () => {
    const res = await request(app)
      .put(`/passes/${passId}`)
      .send({
        level: 3
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', passId);
    expect(res.body).toHaveProperty('level');
    expect(res.body.created_at).not.toBe(res.body.updated_at)
  });

  it('should delete a pass by ID', async () => {
    const res = await request(app).delete(`/passes/${passId}`);

    expect(res.statusCode).toBe(200);
  });

  it('should return 404 when trying to get a non-existent pass', async () => {
    const res = await request(app).get('/passes/none');

    expect(res.statusCode).toBe(404);
  });
});