const axios = require('axios');
const { addLocalPath } = require('../../helpers/helpers');

describe('App Routes', () => {
  it('should return 404 for an invalid route', async () => {
    const res = await axios
      .get(addLocalPath('/none'))
      .catch(err => err.response);

    expect(res.status).toBe(404);
  });
});