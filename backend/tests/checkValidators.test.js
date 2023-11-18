const { isPassLevelValid, isPlaceAccessValid } = require("../helpers/verificators");

describe('Check Validators', () => {
  it('should return true if level between 1 and 5 included', async () => {
    const values = [1, 2, 3, 4, 5];
    values.forEach(value => {
      expect(isPassLevelValid({ level: value })).toBe(true);
    });
  });

  it('should return false if level out 1 and 5 included', async () => {
    const [min, max] = [6, 10000];
    Array.from({ length: 5 }).forEach(() => {
      const random = Math.floor(Math.random() * (max - min + 1) + min)
      expect(isPassLevelValid({ level: random })).toBe(false);
    });
    Array.from({ length: 5 }).forEach(() => {
      const random = -Math.floor(Math.random() * (max - min + 1) + min)
      expect(isPassLevelValid({ level: random })).toBe(false);
    });
  });

  it('should return true if user age and pass level if above or equal the required place age and level', async () => {
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
    data.forEach(value => {
      expect(isPlaceAccessValid(value)).toBe(true);
    })
  });

  it('should return false if user age or pass level is bellow the required place age and level', async () => {
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
    data.forEach(value => {
      expect(isPlaceAccessValid(value)).toBe(false);
    })
  });
});