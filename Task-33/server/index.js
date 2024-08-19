const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigin = 'https://66c2ce19f0169f47652661c2--sensational-tulumba-a330b7.netlify.app';
//const allowedOrigin='http://localhost:5173'
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies to be sent with requests
}));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

app.use(cookieParser());
app.use(express.json());

// Set up routes
app.post('/set-cookie', (req, res) => {
    const { name, value } = req.body;
    
    if (name && value) {
        res.cookie(name, value, {
            maxAge: 900000,           // Cookie expires in 15 minutes
            httpOnly: true,           // Cookie is only accessible by the web server
            secure: true,             // Ensures cookie is sent over HTTPS
            sameSite: 'None',         // Allows cross-site cookie sharing
            domain: 'your-frontend-domain.com' // Replace with your actual frontend domain
        });
        
        res.status(200).json({ message: `Cookie ${name} set successfully` });
    } else {
        res.status(400).json({ message: 'Name and value are required to set a cookie' });
    }
});


app.get('/get-cookies', (req, res) => {
    console.log('GET /get-cookies called');
    const cookies = req.cookies;
    if (Object.keys(cookies).length > 0) {
        res.status(200).json(cookies);
    } else {
        res.status(404).json({ message: 'No cookies found' });
    }
});

app.get('/created', (req, res) => {
    res.status(201).json({ message: 'Resource created successfully' });
});

app.get('/bad-request', (req, res) => {
    res.status(400).json({ message: 'Bad request' });
});

app.get('/not-found', (req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.get('/server-error', (req, res) => {
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
