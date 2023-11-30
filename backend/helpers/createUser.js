const { User, Pass } = require('../models');
const bcrypt = require('bcrypt');
const { normalisePhoneNumber } = require('./helpers')

const createUser = async (body) => {
  try {
    const pass = await Pass.create({ level: 1 });
    if (!pass) {
      return { error: 'Error: pass has not successfully been created' };
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    if (!hashedPassword) {
      return { error: 'Erorr: the hashed password has not successfully been created' };
    }

    const user = await User.create({
      ...body,
      phone_number: normalisePhoneNumber(body.phone_number),
      pass_id: pass._id,
      password: hashedPassword
    });
    if (!user) {
      return { error: 'Error: user has not successfully been created' };
    }

    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = createUser;
