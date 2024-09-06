const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
  try {
    console.log("Registering User...")
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log("unsuccessful " + error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const payload = { user: { username: user.username } };
  const token = jwt.sign(payload, 'jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
