const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe("Place Models", () => {
  let placeId;
  const placeMock = {
    phone_number: faker.phone.number(),
    required_pass_level: faker.number.int({ min: 1, max: 5 }),
    required_age_level: faker.number.int({ min: 18, max: 150 }),
  };

  beforeAll(async () => {
    const res = await axios.post(addLocalPath('/places'), placeMock);
    placeId = res.data._id;
  });

  afterAll(async () => {
    await axios.delete(addLocalPath(`/places/${placeId}`));
  });

  it('should not create a new place if at least one required fields non-existent', async () => {
    const validFields = ["required_pass_level", "required_age_level"];

    for (const field of validFields) {
      const data = { ...placeMock };
      delete data[field];
      const res = await axios.post(addLocalPath('/places'),
        {
          ...data,
        }
      ).catch(err => err.response);
  
      expect(res.status).toBe(400);
    }
  });

  it('should not create a new place if at least one required fields is null', async () => {
    const validFields = ["required_pass_level", "required_age_level"];

    for (const field of validFields) {
      const res = await axios.post(addLocalPath('/places'),
        {
          ...placeMock,
          [field]: null,
        }
      ).catch(err => err.response);
  
      expect(res.status).toBe(400);
    }
  });

  it('should not create a new place if at least one required fields is undefined', async () => {
    const validFields = ["required_pass_level", "required_age_level"];

    for (const field of validFields) {
      const res = await axios.post(addLocalPath('/places'),
        {
          ...placeMock,
          [field]: undefined,
        }
      ).catch(err => err.response);
  
      expect(res.status).toBe(400);
    }
  });

  it('should not create a new place if required_pass and age are invalid', async () => {
    const invalidFields = [
      { name: "required_pass_level", values: [
        faker.number.int({ min: 6, max: 10000 }),
        faker.number.int({ min: -10000, max: 0 })] },
      { name: "required_age_level", values: [
        faker.number.int({ min: 151, max: 10000 }),
        faker.number.int({ min: -10000, max: 17 })
      ]}
    ];

    for (const field of invalidFields) {
      for (const value of field.values) {
        const res = await axios.post(addLocalPath('/places'),
          {
            ...placeMock,
            [field.name]: value,
          }
        ).catch(err => err.response);
    
        expect(res.status).toBe(401);
      }
    }
  });

  it('should not update a new place if pass level out 1 and 5 included and age out 18 and 150 included', async () => {
    const invalidFields = [
      { name: "required_pass_level", values: [
        faker.number.int({ min: 6, max: 10000 }),
        faker.number.int({ min: -10000, max: 0 })] },
      { name: "required_age_level", values: [
        faker.number.int({ min: 151, max: 10000 }),
        faker.number.int({ min: -10000, max: 17 })
      ]}
    ];

    for (const field of invalidFields) {
      for (const value of field.values) {
        const res = await axios.put(addLocalPath('/places'),
          {
            [field.name]: value,
          }
        ).catch(err => err.response);
    
        expect(res.status).toBe(401);
      }
    }
  });

  it('should not create a new place if trying to duplicate unique keys', async () => {
    const res = await axios.post(addLocalPath('/places'), placeMock).catch(err => err.response);
    
    expect(res.status).toBe(401);
  });

  it('should not update a new place if trying to duplicate unique keys', async () => {
    const create = await axios.post(addLocalPath('/places'), {
      ...placeMock,
      phone_number: faker.phone.number(),
    });
    expect(create.status).toBe(201);

    const update = await axios
      .put(addLocalPath(`/places/${create.data._id}`), placeMock)
      .catch(err => err.response);
    expect(update.status).toBe(401);

    const remove = await axios.delete(addLocalPath(`/places/${create.data._id}`));
    expect(remove.status).toBe(200);
  });
})