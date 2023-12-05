const { faker } = require('@faker-js/faker');
const {
  isPlaceAccessValid,
  isObjectKeysDefined
 } = require("../helpers/validator");

describe('Check Validators', () => {
  it('should return true if user age and pass level if above or equal the required place age and pass level', async () => {
    const data = [
      {
        userAge: 30,
        placeAge: 30,
        passLevel: 3,
        placeLevel: 3
      },
      {
        userAge: 42,
        placeAge: 38,
        passLevel: 5,
        placeLevel: 4
      }
    ];
    data.forEach(v => {
      expect(isPlaceAccessValid(v.userAge, v.placeAge, v.passLevel, v.placeLevel)).toBe(true);
    });
  });

  it('should return false if user age or pass level is bellow the required place age and pass level', async () => {
    const data = [
      {
        userAge: 30,
        placeAge: 47,
        passLevel: 3,
        placeLevel: 3
      },
      {
        userAge: 30,
        placeAge: 30,
        passLevel: 3,
        placeLevel: 4
      }
    ];
    data.forEach(v => {
      expect(isPlaceAccessValid(v.userAge, v.placeAge, v.passLevel, v.placeLevel)).toBe(false);
    });
  });

  it('should return true if a key is defined', async () => {
    const obj = {
      first_name : faker.person.firstName(),
      last_name: faker.person.lastName()
    };
    expect(isObjectKeysDefined(obj, ["last_name", "first_name"])).toBe(true);
    const objects = [
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: faker.number.int(),
      },
      {
        age: faker.number.int(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      {
        age: faker.person.lastName(),
        last_name: faker.person.lastName(),
        first_name: faker.person.firstName(),
      },
    ];
    objects.forEach(object => {
      expect(isObjectKeysDefined(object, ["last_name", "first_name", "age"])).toBe(true);
    });
  });

  it('should return false if a key is undefined', async () => {
    const objects = [
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      {
        first_name: null,
        last_name: faker.person.lastName(),
        age: faker.number.int(),
      },
      {
        first_name: faker.person.firstName(),
        last_name: undefined,
        age: faker.person.lastName(),
      },
    ];
    objects.forEach(object => {
      expect(isObjectKeysDefined(object, ["last_name", "first_name", "age"])).toBe(false);
    });
  });
});