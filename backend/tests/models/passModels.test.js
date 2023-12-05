const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { Pass } = require('../../models');

describe("Pass Models", () => {
  it('should return an error when a required field is missing', async () => {
    try {
      await Pass.create({ level: null });
    } catch (err) {
      expect(err.name).toBe('ValidationError');
      expect(err.errors.level.properties.type).toBe('required');
    }
  });

  it('should return an error when level value out boundaries', async () => {
    const invalidPassLevel = [
      { level: faker.number.int({ min: -10000, max: 0 }), type: 'min' },
      { level: faker.number.int({ min: 6, max: 10000 }), type: 'max' },
    ];
    for (const { level, type } of invalidPassLevel) {
      try {
        await Pass.create({ level });
        expect(true).toBe(false);
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.errors.level.properties.type).toBe(type);
      }
    }
  });
})