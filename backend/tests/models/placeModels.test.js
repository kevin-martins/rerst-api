const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { addLocalPath } = require('../../helpers/helpers');

describe("Place models", () => {
  const userMock = {
    required_pass_level: faker.number.int({ min: 1, max: 5 }),
    required_age_level: faker.number.int({ min: 18, max: 150 }),
  };

  it('should not create a new place if at least one required fields is null', async () => {
    const invalidFields = ["required_pass_level", "required_age_level"];
    invalidFields.forEach(async field => {
      const res = await axios.post(addLocalPath('/places'),
        {
          ...userMock,
          [field]: null,
        }
      ).catch(err => err.response);

      expect(res.status).toBe(400);
    });
  });

  it('should not create a new place if at least one value is uncorrect', async () => {
    const invalidFields = [
      { name: "required_pass_level", values: [
        faker.number.int({ min: 6, max: 10000 }),
        faker.number.int({ min: -10000, max: 0 })] },
      { name: "required_age_level", values: [
        faker.number.int({ min: 151, max: 10000 }),
        faker.number.int({ min: -10000, max: 17 })
      ]}
    ];
    invalidFields.forEach(async field => {
      field.values.forEach(async value => {
        const res = await axios.post(addLocalPath('/places'),
          {
            ...userMock,
            [field.name]: value,
          }
        ).catch(err => err.response);
  
        expect(res.status).toBe(400);
      })
    });
  });
})