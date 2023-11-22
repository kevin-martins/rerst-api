const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('Auth models', () => {
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

  it('should not log the user in', async () => {
    const requestMock = {
      phone_number: userMock.phone_number,
      password: faker.internet.password()
    }
    const res = await axios
      .post(addLocalPath('/login'), requestMock)
      .catch(err => err.response);

    expect(res.status).toBe(401);
  });

  it('should not sign the user in', async () => {
    const requestMock = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 150 }),
      phone_number: faker.phone.number(),
      password: userMock.password,
      password_confirmation: userMock.password
    }
    const res = await axios
      .post(addLocalPath('/signin'), requestMock)
      .catch(err => err.response);

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
  });
});