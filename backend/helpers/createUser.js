const { User, Pass, Place } = require('../models');
const bcrypt = require('bcrypt');

const createUser = async (body) => {
  try {
    const pass = await Pass.create({ level: 1 });
    if (!pass) {
      throw new Error('Error: pass has not successfully been created');
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    if (!hashedPassword) {
      throw new Error('Erorr: the hashed password has not successfully been created');
    }

    const user = await User.create({
      ...body,
      pass_id: pass._id,
      password: hashedPassword
    });
    if (!user) {
      throw new Error('Error: user has not successfully been created');
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = createUser;
