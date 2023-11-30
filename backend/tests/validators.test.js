const { faker } = require('@faker-js/faker');
const {
  isPhoneNumberUnique,
  isLevelValid,
  isPlaceAccessValid,
  isAgeValid,
  isObjectKeysDefined
 } = require("../helpers/validator");

describe('Check Validators', () => {
  it('should return true if phone number is unique', async () => {
    const userMock = [
      {
        phone_number: "0" + faker.string.numeric({ length: 9, exclude: ['0'] })
      },
      {
        phone_number: "0" + faker.string.numeric({ length: 9, exclude: ['0'] })
      },
      {
        phone_number: "0" + faker.string.numeric({ length: 9, exclude: ['0'] })
      }
    ];
    userMock.forEach(() => {
      expect(isPhoneNumberUnique(userMock, "+33" + faker.string.numeric({ length: 9 }))).toBe(true);
    });
  });

  it('should return false if phone number exist', async () => {
    const userMock = [
      {
        phone_number: "0" + faker.string.numeric({ length: 9, exclude: ['0'] })
      },
      {
        phone_number: "0" + faker.string.numeric({ length: 9, exclude: ['0'] })
      },
      {
        phone_number: "0" + faker.string.numeric({ length: 9, exclude: ['0'] })
      }
    ];
    userMock.forEach(mock => {
      expect(isPhoneNumberUnique(userMock, "+33" + mock.phone_number.replace('0', ''))).toBe(false);
    });
  });

  it('should return true if level between 1 and 5 included', async () => {
    const levels = [
      faker.number.int({ min: 1, max: 5 }),
      faker.number.int({ min: 1, max: 5 })
    ];
    levels.forEach(level => {
      expect(isLevelValid(level)).toBe(true);
    });
  });

  it('should return false if level out 1 and 5', async () => {
    const levels = [
      faker.number.int({ min: -10000, max: 0 }),
      faker.number.int({ min: -10000, max: 0 }),
      faker.number.int({ min: 6, max: 10000 }),
      faker.number.int({ min: 6, max: 10000 })
    ];
    levels.forEach(level => {
      expect(isLevelValid(level)).toBe(false);
    });
  });

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

  it('should return true if age in 18 and 150 included', async () => {
    const ages = [
      faker.number.int({ min: 18, max: 150 }),
      faker.number.int({ min: 18, max: 150 }),
      faker.number.int({ min: 18, max: 150 }),
    ];
    ages.forEach(age => {
      expect(isAgeValid(age)).toBe(true);
    });
  });

  it('should return false if age out 18 and 150', async () => {
    const ages = [
      faker.number.int({ min: -10000, max: 17 }),
      faker.number.int({ min: 151, max: 10000 }),
    ];
    ages.forEach(age => {
      expect(isAgeValid(age)).toBe(false);
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