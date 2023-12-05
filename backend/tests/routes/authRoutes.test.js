const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('Auth Routes', () => {
  let userId;
  const validMock = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 150 }),
    phone_number: "+33"+faker.string.numeric({ length: 9, exclude: ['0'] }),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
  };

  afterAll(async () => {
    await axios.delete(addLocalPath(`/users/${userId}`));
  });

  it('should sign the user in', async () => {
    const requestMock = {
      ...validMock,
      password_confirmation: validMock.password
    }
    const res = await axios
      .post(addLocalPath('/signin'), requestMock)
      .catch(err => err.response);

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).not.toHaveProperty('password');
    expect(res.data).toHaveProperty('token');
    userId = res.data._id;
  });

  it('should log the user in', async () => {
    const requestMock = {
      phone_number: validMock.phone_number,
      password: validMock.password
    }
    const res = await axios.post(addLocalPath('/login'), requestMock).catch(err => err.reponse);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).not.toHaveProperty('password');
    expect(res.data).toHaveProperty('token');
  });

  it('should return 401 if log in with bad password', async () => {
    const requestMock = {
      phone_number: validMock.phone_number,
      password: faker.internet.password()
    }

    const res = await axios.post(addLocalPath('/login'), requestMock).catch(err => err.response);
    expect(res.status).toBe(401);
  });

  it('should return 400 if sign in required field is missing', async () => {
    const requestMock = {
      phone_number: validMock.phone_number,
      password: faker.internet.password()
    }
    const res = await axios.post(addLocalPath('/login'), requestMock).catch(err => err.response);
    expect(res.status).toBe(401);
  });

  it('should return 401 if sign in password confirmation is different', async () => {
    const requestMock = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 150 }),
      phone_number: "+33"+faker.string.numeric({ length: 9, exclude: ['0'] }),
      password: validMock.password,
      password_confirmation: faker.internet.password()
    }
    const res = await axios.post(addLocalPath('/signin'), requestMock).catch(err => err.response);

    expect(res.status).toBe(401);
  });
});