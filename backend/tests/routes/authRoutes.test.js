const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('Auth Routes', () => {
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
    await axios.delete(addLocalPath(`/users/${userId}`));
  });

  it('should log the user in', async () => {
    const requestMock = {
      phone_number: userMock.phone_number,
      password: userMock.password
    }
    const res = await axios.post(addLocalPath('/login'), requestMock).catch(err => err.reponse);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id');
  });

  it('should sign the user in', async () => {
    const requestMock = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 150 }),
      phone_number: faker.phone.number(),
      password: userMock.password,
      password_confirmation: userMock.password
    }
    const res = await axios.post(addLocalPath('/signin'), requestMock);

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
  });
});