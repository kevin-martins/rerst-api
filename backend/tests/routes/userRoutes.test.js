const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('User Routes', () => {
  let userId;
  let userPassId;
  const lastDigits = faker.string.numeric({ length: 9, exclude: ['0'] })
  const age = faker.number.int({ min: 18, max: 150 });
  const validMock = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    phone_number: "+33"+lastDigits,
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
    age,
  };
  const placeMock = {
    address: faker.location.streetAddress(),
    phone_number: "+33"+faker.string.numeric({ length: 9, exclude: ['0'] }),
    required_pass_level: 1,
    required_age_level: age,
  };

  it('should return 201 when creating a valid user', async () => {
    const res = await axios.post(addLocalPath('/users'), validMock);
    
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).toHaveProperty('pass_id');
    expect(res.data).toHaveProperty('phone_number', "0"+lastDigits);
    expect(res.data).toHaveProperty('age');
    expect(res.data).not.toHaveProperty('password');
    
    userId = res.data._id;
    userPassId = res.data.pass_id;
  });

  it('should return 200 when fetching a user by id', async () => {
    const res = await axios.get(addLocalPath(`/users/${userId}`));
  
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', userId);
    expect(res.data).not.toHaveProperty('password');
    expect(res.data.phone_number).toMatch(/^0([1-9]{9})$/);
  });
  
  it('should return 200 when fetching all users', async () => {
    const res = await axios.get(addLocalPath(`/users`));
  
    expect(res.status).toBe(200);
    res.data.forEach(user => {
      expect(user).toHaveProperty('_id');
      expect(user).not.toHaveProperty('password');
    });
  });
  
  it('should return 200 when updating a user by id', async () => {
    const lastDigits = faker.string.numeric({ length: 9, exclude: ['0'] })
    const res = await axios.put(addLocalPath(`/users/${userId}`), {
      first_name: 'Moe',
      last_name: 'Szyslak',
      phone_number: "+33" + lastDigits
    });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', userId);
    expect(res.data).toHaveProperty('first_name', 'Moe');
    expect(res.data).toHaveProperty('last_name', 'Szyslak');
    expect(res.data).toHaveProperty('phone_number', "0" + lastDigits);
    expect(res.data).not.toHaveProperty('password');
  });

  it('should return 403 if the user is unauthorized to access a place', async () => {
    const newPlace = await axios.post(addLocalPath('/places'), {
      ...placeMock,
      required_pass_level: 3
    });

    const access = await axios
      .post(addLocalPath(`/users/${userId}/access`), { placeId: newPlace.data._id })
      .catch(err => err.response);
  
    expect(access.status).toBe(403);
    await axios.delete(addLocalPath(`/places/${newPlace.data._id}`));
  });
  
  it('should return 200 when fetching all places available for a user', async () => {
    const newPlace = await axios.post(addLocalPath('/places'), placeMock);
    const places = await axios.get(addLocalPath(`/users/${userId}/places`));
    const removedPlace = await axios.delete(addLocalPath(`/places/${newPlace.data._id}`));

    expect(places.status).toBe(200);
    places.data.forEach(place => expect(place).toHaveProperty('_id'));
  
    expect(removedPlace.status).toBe(200);
  });
  
  it('should return 200 when deleting a user by id', async () => {
    const user = await axios.delete(addLocalPath(`/users/${userId}`)).catch(err => err.response);
    const pass = await axios.get(addLocalPath(`/passes/${userPassId}`)).catch(err => err.response);

    expect(user.status).toBe(200);
    expect(user.data).not.toHaveProperty('password');
    expect(pass.status).toBe(404);
  });
  
  it('should return 404 when trying to get a non-existent user', async () => {
    const res = await Promise.all([
      axios.get(addLocalPath('/users/none')).catch(err => err.response),
      axios.put(addLocalPath('/users/none'), {}).catch(err => err.response),
      axios.delete(addLocalPath('/users/none')).catch(err => err.response),
      axios.post(addLocalPath('/users/none/access'), {}).catch(err => err.response),
      axios.get(addLocalPath('/users/none/places')).catch(err => err.response),
    ]);
  
    res.forEach(user => expect(user.status).toBe(404));
  });
});
