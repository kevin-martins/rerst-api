const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe('Place Routes', () => {
  let placeId;
  const placeMock = {
    address: "843 Chemin des Taupes, 44000 Nantes",
    phone_number: "0798765435",
    required_pass_level: 5,
    required_age_level: 47
  }

  it('should create a new place', async () => {
    const res = await axios.post(addLocalPath('/places'), placeMock);

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('_id');
    expect(res.data).toHaveProperty('required_pass_level');
    expect(res.data).toHaveProperty('required_age_level');
    placeId = res.data._id;
  });

  it('should get all places', async () => {
    const res = await axios.get(addLocalPath('/places'));

    expect(res.status).toBe(200);
    res.data.forEach(place => {
      expect(place).toHaveProperty('_id');
      expect(place).toHaveProperty('required_pass_level');
      expect(place).toHaveProperty('required_age_level');
    });
  });

  it('should get a place by ID', async () => {
    const res = await axios.get(addLocalPath(`/places/${placeId}`));

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', placeId);
    expect(res.data).toHaveProperty('required_pass_level');
    expect(res.data).toHaveProperty('required_age_level');
  });

  it('should update a place by ID', async () => {
    const passLevel = faker.number.int({ min: 1, max: 5 });
    const ageLevel = faker.number.int({ min: 18, max: 150 });
    const res = await axios.put(addLocalPath(`/places/${placeId}`), {
      ...placeMock,
      required_pass_level: passLevel,
      required_age_level: ageLevel,
    });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('_id', placeId);
    expect(res.data).toHaveProperty('required_pass_level', passLevel);
    expect(res.data).toHaveProperty('required_age_level', ageLevel);
  });

  it('should delete a place by ID', async () => {
    const res = await axios.delete(addLocalPath(`/places/${placeId}`));

    expect(res.status).toBe(200);
  });

  it('should return 404 when trying to get a non-existent place', async () => {
    const res = await axios.get(addLocalPath('/places/none'))
      .catch(err => err.response);
    expect(res.status).toBe(404);
  });
});
