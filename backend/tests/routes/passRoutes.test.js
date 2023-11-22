const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('Pass Routes', () => {
  let passId;

  it('should create a new pass', async () => {
    const res = await axios.post(addLocalPath('/passes'), { level: 5 });

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).toHaveProperty('created_at');
    expect(res.data).toHaveProperty('updated_at');
    passId = res.data._id;
    expect(passId).toBeDefined();
  });

  it('should get all passes', async () => {
    const res = await axios.get(addLocalPath('/passes'));

    expect(res.status).toBe(200);
    res.data.forEach(pass => {
      expect(pass).toHaveProperty('_id');
    })
  });

  it('should get a pass by ID', async () => {
    const res = await axios.get(addLocalPath(`/passes/${passId}`));

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', passId);
  });

  it('should update a pass by ID', async () => {
    const res = await axios
      .put(addLocalPath(`/passes/${passId}`), { level: 3 });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', passId);
    expect(res.data).toHaveProperty('level');
    expect(res.data.created_at).not.toEqual(res.data.updated_at);
  });

  it('should delete a pass by ID', async () => {
    const res = await axios.delete(addLocalPath(`/passes/${passId}`));

    expect(res.status).toBe(200);
  });

  it('should return 404 when trying to get, update, or delete a non-existent pass', async () => {
    const res = await Promise.all([
      axios.get(addLocalPath('/passes/none')).catch(err => err.response),
      axios.put(addLocalPath('/passes/none')).catch(err => err.response),
      axios.delete(addLocalPath('/passes/none')).catch(err => err.response),
    ]);

    res.forEach(pass => expect(pass.status).toBe(404));
  });
});