const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'secret_key';
const usersFilePath = './users.json';


function readJsonFileSync(filepath, defaultValue) {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return data ? JSON.parse(data) : defaultValue;
    } catch (err) {
        return defaultValue;
    }
}

// Helper function to write JSON data to file
function writeJsonFileSync(filepath, data) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

// User registration
app.post('/register', (req, res) => {
    const { name, email, age, role, password } = req.body;

    let users = readJsonFileSync(usersFilePath, []);
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ name, email, age, role, password });
    writeJsonFileSync(usersFilePath, users);

    res.json({ message: 'User registered successfully' });
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = readJsonFileSync(usersFilePath, []);
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected route to save JSON data
app.post('/save', authenticateToken, (req, res) => {
    const data = req.body;

    // Only admins can save data
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can save data' });
    }

    writeJsonFileSync(usersFilePath, data);
    res.json({ message: 'Data saved successfully' });
});

// Protected route to read JSON data (Admin only)
app.get('/read', authenticateToken, (req, res) => {
    // Only admins can read data
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can read data' });
    }

    const data = readJsonFileSync(usersFilePath, []);
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
