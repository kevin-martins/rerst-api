const { faker } = require('@faker-js/faker');
const { isLevelValid, isPlaceAccessValid, isAgeValid } = require("../helpers/validator");

describe('Check Validators', () => {
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
    })
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
    })
  });

  it('should return true if age in 18 and 150 included', async () => {
    const ages = [
      faker.number.int({ min: 18, max: 150 }),
      faker.number.int({ min: 18, max: 150 }),
      faker.number.int({ min: 18, max: 150 }),
    ];
    ages.forEach(age => {
      expect(isAgeValid(age)).toBe(true);
    })
  });

  it('should return false if age out 18 and 150', async () => {
    const ages = [
      faker.number.int({ min: -10000, max: 17 }),
      faker.number.int({ min: 151, max: 10000 }),
    ];
    ages.forEach(age => {
      expect(isAgeValid(age)).toBe(false);
    })
  });
});