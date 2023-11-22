const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe("Pass models", () => {
  it('should not create a new pass if the required fields is null, undefined or empty', async () => {
    const invalidPasses = [
      { level: null },
      { level: undefined },
      {}
    ];
    for (const pass of invalidPasses) {
      const res = await axios
        .post(addLocalPath('/passes'), pass)
        .catch(err => err.response);
  
      expect(res.status).toBe(400);
    }
  });

  it('should not create a new pass if level out 1 and 5 included', async () => {
    const invalidLevels = [
      faker.number.int({ min: 6, max: 10000 }),
      faker.number.int({ min: -10000, max: 0 })
    ];
    for (const level of invalidLevels) {
      const res = await axios
        .post(addLocalPath('/passes'), { level })
        .catch(err => err.response);
  
      expect(res.status).toBe(401);
    }
  });

  it('should not update a pass if level out 1 and 5 included', async () => {
    const create = await axios
      .post(addLocalPath('/passes'), {
        level: faker.number.int({ min: 1, max: 5 })
      });
    expect(create.status).toBe(201);

    const invalidLevels = [
      faker.number.int({ min: 6, max: 10000 }),
      faker.number.int({ min: -10000, max: 0 })
    ];
    for (const level of invalidLevels) {
      const res = await axios
        .put(addLocalPath(`/passes/${create.data._id}`), { level })
        .catch(err => err.response);

      expect(res.status).toBe(401);
    }

    const remove = await axios.delete(addLocalPath(`/passes/${create.data._id}`))
    expect(remove.status).toBe(200);
  });
})