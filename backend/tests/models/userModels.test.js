const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe("User models", () => {
  let userId;
  const userMock = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 150 }),
    phone_number: faker.phone.number(),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
  };

  beforeAll(async () => {
    const res = await axios.post(addLocalPath('/users'), userMock);
    userId = res.data._id;
  });

  afterAll(async () => {
    const res = await axios.delete(addLocalPath(`/users/${userId}`));
  });

  it('should not create a new user if at least one required fields is not defined', async () => {
    const validFields = ["last_name", "first_name", "age", "phone_number", "password"];
    validFields.forEach(async field => {
      const data = { ...userMock };
      delete data[field];
      const res = await axios.post(addLocalPath('/users'),
        {
          ...data,
        }
      ).catch(err => err.response);

      expect(res.status).toBe(400);
    });
  });

  it('should not create a new user if at least one required fields is null', async () => {
    const validFields = ["last_name", "first_name", "age", "phone_number", "password"];
    validFields.forEach(async field => {
      const res = await axios.post(addLocalPath('/users'),
        {
          ...userMock,
          [field]: null
        }
      ).catch(err => err.response);

      expect(res.status).toBe(400);
    });
  });

  it('should not create a new user if at least one required fields is undefined', async () => {
    const validFields = ["last_name", "first_name", "age", "phone_number", "password"];
    validFields.forEach(async field => {
      const res = await axios.post(addLocalPath('/users'),
        {
          ...userMock,
          [field]: undefined
        }
      ).catch(err => err.response);

      expect(res.status).toBe(400);
    });
  });

  it('should not create a new user if age not between 18 and 150 included', async () => {
    const invalidAges = [
      faker.number.int({ min: -10000, max: 17 }),
      -faker.number.int({ min: 151, max: 10000 })
    ];
    invalidAges.forEach(async age => {
      const res = await axios.post(addLocalPath('/passes'),
        {
          ...userMock,
          age,
        }
      ).catch(err => err.response);

      expect(res.status).toBe(400);
    });
  });

  // it('should not create a new user if trying to duplicate a unique key', async () => {
  //   const res = await axios.post(addLocalPath('/users'), userMock).catch(err => err.response);

  //   expect(res.status).toBe(400);
  // });

  // it('should not update a user if trying to use the same unique key from someone else', async () => {
  //   const create = await axios.post(addLocalPath('/users'), {
  //     ...userMock,
  //     phone_number: faker.phone.number(),
  //   });
  //   expect(create.status).toBe(201);

  //   const update = await axios.put(addLocalPath(`/users/${create.data._id}`), userMock).catch(err => err.response);
  //   expect(update.status).toBe(400);

  //   const remove = await axios.delete(addLocalPath(`/users/${create.data._id}`));
  //   expect(remove.status).toBe(200);
  // });
})