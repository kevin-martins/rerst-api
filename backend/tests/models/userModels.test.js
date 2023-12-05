const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { User } = require('../../models');

describe("User Models", () => {
  const lastDigits = faker.string.numeric({ length: 9, exclude: ['0']});
  const validMock = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 150 }),
    phone_number: "+33"+lastDigits,
    password: faker.internet.password(),
    address: faker.string.alpha(10)
  };

  it('should return an error when a required field is missing', async () => {
    const requiredFields = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 150 }),
      phone_number: "+33"+lastDigits,
      password: faker.internet.password()
    };
    for (const key in requiredFields) {
      const invalidUser = {
        ...validMock,
        [key]: null
      }
      try {
        await User.create(invalidUser);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors[key].properties.type).toBe('required');
      }
    }
  });

  it('should return an error when a user field format is invalid', async () => {
    const invalidFormat = {
      first_name: faker.string.numeric(6),
      last_name: faker.string.symbol(6),
      phone_number: faker.number.int(6),
    }
    for (const key in invalidFormat) {
      const invalidUser = {
        ...validMock,
        [key]: invalidFormat[key]
      }
      try {
        await User.create(invalidUser);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors[key]?.properties.type).toBe('regexp');
      }
    }
  });

  it('should return an error when a user age is out 18 and 150 included', async () => {
    const invalidAges = [
      { age: faker.number.int({ min: -10000, max: 17 }), type: 'min' },
      { age: faker.number.int({ min: 151, max: 10000 }), type: 'max' },
    ];
    for (const { age, type } of invalidAges) {
      const invalidUser = {
        ...validMock,
        age
      }
      try {
        await User.create(invalidUser);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors.age.properties.type).toBe(type);
      }
    }
  });

  it('should normalise phone number before saving', async () => {
    const nonNormalisedPhone = {
      ...validMock,
      phone_number: "+33" + faker.string.numeric({ length: 9, exclude: ['0'] }),
    };
    console.log(nonNormalisedPhone);
    const user = await User.create(nonNormalisedPhone);
    console.log('user', user, user.match(/^0([1-9]{9})$/));
    expect(user.phone_number).toMatch(/^0([1-9]{9})$/);
  });
})