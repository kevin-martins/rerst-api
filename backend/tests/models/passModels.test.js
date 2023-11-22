const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe("Pass Models", () => {
  let passId;
  const passMock = {
    level: faker.number.int({ min: 1, max: 5 })
  }

  beforeAll(async () => {
    const res = await axios.post(addLocalPath('/passes'), passMock);
    passId = res.data._id;
  });

  afterAll(async () => {
    await axios.delete(addLocalPath(`/passes/${passId}`));
  });

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
    const invalidLevels = [
      faker.number.int({ min: 6, max: 10000 }),
      faker.number.int({ min: -10000, max: 0 })
    ];

    for (const level of invalidLevels) {
      const res = await axios
        .put(addLocalPath(`/passes/${passId}`), { level })
        .catch(err => err.response);

      expect(res.status).toBe(401);
    }
  });
})