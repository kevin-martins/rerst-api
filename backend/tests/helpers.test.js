const { faker } = require('@faker-js/faker');
const { normalisePhoneNumber } = require("../helpers/helpers");

describe('Check Validators', () => {
  it('should return true if phone number has successfully been normalised', async () => {
    const phoneNumbers = [
      "0" + faker.string.numeric({ length: 9, exclude: ['0'] }),
      "+3" + ("3" + faker.string.numeric({ length: 9, exclude: ['0'] })).match(/.{2}/g).join(' '),
      ("0" + faker.string.numeric({ length: 9, exclude: ['0'] })).match(/.{2}/g).join(' ')
    ];
    phoneNumbers.forEach(phoneNumber => {
      expect(normalisePhoneNumber(phoneNumber).length).toEqual(10);
    });
  });
});