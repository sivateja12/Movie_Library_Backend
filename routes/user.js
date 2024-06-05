const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.route('/signup').post(async (req, res) => {
  const { userName,email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Email and password are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ userName,email, password: hashedPassword });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json('Invalid credentials');
  }
console.log(user._id)
  res.json({msg:'Login success',uid:user._id});
});

module.exports = router;  // Correct the export statement
