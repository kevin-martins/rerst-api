const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('User Routes', () => {
  let userId;
  let userPassId;
  const lastDigits = faker.string.numeric({ length: 9, exclude: ['0'] })
  const userMock = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 150 }),
    phone_number: "+33"+lastDigits,
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
  };
  const placeMock = {
    address: faker.location.streetAddress(),
    phone_number: "+33"+faker.string.numeric({ length: 9, exclude: ['0'] }),
    required_pass_level: faker.number.int({ min: 1, max: 5 }),
    required_age_level: faker.number.int({ min: 18, max: 150 }),
  };

  it('should create a new user and its pass', async () => {
    const res = await axios.post(addLocalPath('/users'), userMock);
    
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).toHaveProperty('pass_id');
    expect(res.data).toHaveProperty('phone_number', "0"+lastDigits);
    expect(res.data).toHaveProperty('age');
    expect(res.data).not.toHaveProperty('password');
    
    userId = res.data._id;
    userPassId = res.data.pass_id;
  });

  it('should create a pass when creating a new user', async () => {
    const res = await axios.get(addLocalPath(`/passes/${userPassId}`));
  
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', userPassId);
  });
  
  it('should get all users', async () => {
    const res = await axios.get(addLocalPath(`/users`));
  
    expect(res.status).toBe(200);
    res.data.forEach(user => {
      expect(user).toHaveProperty('_id');
      expect(user).not.toHaveProperty('password');
    });
  });
  
  it('should get a user by ID', async () => {
    const res = await axios.get(addLocalPath(`/users/${userId}`));
  
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', userId);
    expect(res.data).not.toHaveProperty('password');
    expect(res.data.phone_number.length).toEqual(10);
  });
  
  it('should update a user by ID', async () => {
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
  
  it('should get all places available for a user', async () => {
    const [updatedPass, newPlace] = await Promise.all([
      axios.put(addLocalPath(`/passes/${userPassId}`), { level: 5 }),
      axios.post(addLocalPath('/places'), placeMock),
    ]);
    const places = await axios.get(addLocalPath(`/users/${userId}/places`));
    const removedPlace = await axios.delete(addLocalPath(`/places/${newPlace.data._id}`));

    expect(updatedPass.status).toBe(200);
    expect(updatedPass.data).toHaveProperty('_id');
  
    expect(newPlace.status).toBe(201);
    expect(newPlace.data).toHaveProperty('_id');

    expect(places.status).toBe(200);
    places.data.forEach(place => expect(place).toHaveProperty('_id'));
  
    expect(removedPlace.status).toBe(200);
  });
  
  it('should delete a user by ID and its pass', async () => {
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
  
    res.forEach(user => { console.log(user.status);expect(user.status).toBe(404)});
  });
});
