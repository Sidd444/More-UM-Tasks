const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Route to set a cookie from frontend input
app.post('/set-cookie', (req, res) => {
    const { name, value } = req.body;
    if (name && value) {
        res.cookie(name, value, { maxAge: 900000, httpOnly: true });
        res.status(200).json({ message: `Cookie ${name} set successfully` });
    } else {
        res.status(400).json({ message: 'Name and value are required to set a cookie' });
    }
});

// Route to retrieve all cookies
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    if (Object.keys(cookies).length > 0) {
        res.status(200).json(cookies);
    } else {
        res.status(404).json({ message: 'No cookies found' });
    }
});

// Route to send a 201 status
app.get('/created', (req, res) => {
    res.status(201).json({ message: 'Resource created successfully' });
});

// Route to send a 400 status
app.get('/bad-request', (req, res) => {
    res.status(400).json({ message: 'Bad request' });
});

// Route to send a 404 status
app.get('/not-found', (req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Route to send a 500 status
app.get('/server-error', (req, res) => {
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
