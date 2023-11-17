const bcrypt = require('bcrypt');
const User = require('../models/User');

// exports.auth = async (req, res, next) => {
//   try {
//     const { phoneNumber, password } = req.body;
//     console.log(phoneNumber)
//     const user = await User.findOne({ phone_number: phoneNumber });
//     const pwd = await bcrypt.compare(password, user.password)
//     if (!user || !(pwd)) {
//       console.log("error")
//       return res.status(401).json({ message: 'Error: invalid phone number or password' });
//     }

//     console.log(user)
//     console.log(user.password, password, pwd)
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find((u) => u.username === username && u.password === password);
//   if (user) {
//     // Generate JWT token with user ID and any other data
//     const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
//       expiresIn: '1h' // Token expiration time
//     });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// })
