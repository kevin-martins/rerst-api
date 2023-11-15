const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import your User model

const auth = async (req, res, next) => {
  try {
    const { phone_number, password } = req.body;
    const user = await User.findOne({ phone_number });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Error: invalid phone number or password');
    }

    next();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = auth
