const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../server');

describe('User Routes', () => {
  let userId;

  it('should create a new user', async () => {
    const password = 'secret';
    const res = await request(app)
      .post('/users')
      .send({
        first_name: "Kevin",
        last_name: "Martins",
        age: 25,
        phone_number: "0685793791",
        address: "12 Rue de l'Eglise, 31000 Toulouse",
        password
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('pass_id');
    expect(res.body).toHaveProperty('phone_number');
    expect(res.body).toHaveProperty('age');
    expect(res.body).not.toHaveProperty('password');
    // expect(await bcrypt.compare(password, res.password)).toBe(true);
    userId = res.body._id;
  });

  it('should get all users', async () => {
    const res = await request(app).get(`/users`);

    expect(res.statusCode).toBe(200);
    res.body.forEach(user => {
      expect(user).toHaveProperty('_id');
      expect(user).not.toHaveProperty('password');
    })
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', userId);
    expect(res.body).not.toHaveProperty('password');
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        first_name: 'Moe',
        last_name: 'Szyslak'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', userId);
    expect(res.body).toHaveProperty('first_name', 'Moe');
    expect(res.body).toHaveProperty('last_name', 'Szyslak');
    expect(res.body).not.toHaveProperty('password');
  });

  it('should delete a user by ID', async () => {
    const res = await request(app).delete(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toHaveProperty('password');
  });

  it('should return 404 when trying to get a non-existent user', async () => {
    const res = await request(app).get('/users/none');

    expect(res.statusCode).toBe(404);
  });

  it('should get all places available for a user', async () => {
    const res = await request(app).delete(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toHaveProperty('password');
  });
});
