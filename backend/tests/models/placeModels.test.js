const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { Place } = require('../../models');

describe("Place Models", () => {
  const validMock = {
    phone_number: faker.phone.number(),
    required_pass_level: faker.number.int({ min: 1, max: 5 }),
    required_age_level: faker.number.int({ min: 18, max: 150 }),
  };

  it('should return an error when a required field is missing', async () => {
    const requiredFields = {
      required_pass_level: faker.number.int({ min: 1, max: 5 }),
      required_age_level: faker.number.int({ min: 18, max: 150 }),
    };
    for (const key in requiredFields) {
      const invalidUser = {
        ...validMock,
        [key]: null
      }
      try {
        await Place.create(invalidUser);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors[key].properties.type).toBe('required');
      }
    }
  });

  it('should return an error when required_pass_level value out boundaries', async () => {
    const invalidPlaceLevel = [
      { requiredPassLevel: faker.number.int({ min: -10000, max: 0 }), type: 'min' },
      { requiredPassLevel: faker.number.int({ min: 6, max: 10000 }), type: 'max' },
    ];
    for (const { requiredPassLevel, type } of invalidPlaceLevel) {
      const invalidUser = {
        ...validMock,
        required_pass_level: requiredPassLevel
      }
      try {
        await Place.create(invalidUser);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors.required_pass_level.properties.type).toBe(type);
      }
    }
  });

  it('should return an error when required_age_level value out boundaries', async () => {
    const invalidAgeLevel = [
      { requiredAgeLevel: faker.number.int({ min: -10000, max: 17 }), type: 'min' },
      { requiredAgeLevel: faker.number.int({ min: 151, max: 10000 }), type: 'max' },
    ];
    for (const { requiredAgeLevel, type } of invalidAgeLevel) {
      const invalidUser = {
        ...validMock,
        required_age_level: requiredAgeLevel
      }
      try {
        await Place.create(invalidUser);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors.required_age_level.properties.type).toBe(type);
      }
    }
  });

  it('should normalise phone number before saving', async () => {
    const nonNormalisedPhone = {
      ...validMock,
      phone_number: "+33" + faker.string.numeric({ length: 9, exclude: ['0'] }),
    };
    console.log(nonNormalisedPhone);
    const place = await Place.create(nonNormalisedPhone);
    console.log('place', place, place.match(/^0([1-9]{9})$/));
    expect(place.phone_number).toMatch(/^0([1-9]{9})$/);
  });
})