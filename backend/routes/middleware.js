const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    const { phone_number, password } = req.body;
    const user = await User.findOne({ phone_number });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Error: invalid phone number or password' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
