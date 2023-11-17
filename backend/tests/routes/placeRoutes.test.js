const request = require('supertest');
const app = require('../../server');

describe('Place Routes', () => {
  let placeId;

  it('should create a new place', async () => {
    const res = await request(app)
      .post('/places')
      .send({
        address: "843 Chemin des Taupes, 44000 Nantes",
        phone_number: "0798765435",
        required_pass_level: 5,
        required_age_level: 47
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    placeId = res.body._id;
  });

  it('should get all places', async () => {
    const res = await request(app).get(`/places`);

    expect(res.statusCode).toBe(200);
    res.body.forEach(place => {
      expect(place).toHaveProperty('_id');
    })
  });

  it('should get a place by ID', async () => {
    const res = await request(app).get(`/places/${placeId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', placeId);
  });

  it('should update a place by ID', async () => {
    const res = await request(app)
      .put(`/places/${placeId}`)
      .send({
        required_pass_level: 1,
        required_age_level: 35
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', placeId);
    expect(res.body).toHaveProperty('required_pass_level', 1);
    expect(res.body).toHaveProperty('required_age_level', 35);
  });

  it('should delete a place by ID', async () => {
    const res = await request(app).delete(`/places/${placeId}`);

    expect(res.statusCode).toBe(200);
  });

  it('should return 404 when trying to get a non-existent place', async () => {
    const res = await request(app).get('/places/none');

    expect(res.statusCode).toBe(404);
  });
});
