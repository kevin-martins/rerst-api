const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('Place Routes', () => {
  let placeId;
  const lastDigits = faker.string.numeric({ length: 9, exclude: ['0'] })
  const validMock = {
    address: "843 Chemin des Taupes, 44000 Nantes",
    phone_number: "+33" + lastDigits,
    required_pass_level: faker.number.int({ min: 1, max: 5 }),
    required_age_level: faker.number.int({ min: 18, max: 150 })
  }

  it('should return 201 when creating a new place', async () => {
    const res = await axios.post(addLocalPath('/places'), validMock);

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).toHaveProperty('required_pass_level');
    expect(res.data).toHaveProperty('required_age_level');
    expect(res.data).toHaveProperty('phone_number', "0" + lastDigits);

    placeId = res.data._id;
  });

  it('should return 200 when fetching all places', async () => {
    const res = await axios.get(addLocalPath('/places'));

    expect(res.status).toBe(200);
    res.data.forEach(place => {
      expect(place).toHaveProperty('_id');
      expect(place).toHaveProperty('required_pass_level');
      expect(place).toHaveProperty('required_age_level');
    });
  });

  it('should return 200 when fetching a place by id', async () => {
    const res = await axios.get(addLocalPath(`/places/${placeId}`));

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', placeId);
    expect(res.data).toHaveProperty('required_pass_level');
    expect(res.data).toHaveProperty('required_age_level');
  });

  it('should return 200 when updating a place by id', async () => {
    const phoneNumber = faker.string.numeric({ length: 9, exclude: ['0'] });
    const res = await axios.put(addLocalPath(`/places/${placeId}`), {
      ...validMock,
      required_pass_level: faker.number.int({ min: 1, max: 5 }),
      required_age_level: faker.number.int({ min: 18, max: 150 }),
      phone_number: "+33" + phoneNumber
    });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', placeId);
    expect(res.data).toHaveProperty('required_pass_level');
    expect(res.data).toHaveProperty('required_age_level');
    expect(res.data).toHaveProperty('phone_number', "0" + phoneNumber);
  });

  it('should reutrn 200 when deleting a place by id', async () => {
    const res = await axios.delete(addLocalPath(`/places/${placeId}`));

    expect(res.status).toBe(200);
  });

  it('should return 404 when trying to get a non-existent place', async () => {
    const res = await axios.get(addLocalPath('/places/none'))
      .catch(err => err.response);
    expect(res.status).toBe(404);
  });
});
