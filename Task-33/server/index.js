const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

const websites = ['https://sensational-tulumba-a330b7.netlify.app','http://localhost:5173']; // Allowed frontend origin

app.use(
    cors({
        origin: websites,
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
    })
);

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', websites[0]);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

app.use(cookieParser());
app.use(express.json());

app.post('/set-cookie', (req, res) => {
    const { name, value } = req.body;
    if (name && value) {
        res.cookie(name, value, {
            maxAge: 900000,
            httpOnly: true,
            secure: false, // Set this to true if using HTTPS
            sameSite: 'None',
        });
        res.status(200).json({ message: `Cookie ${name} set successfully` });
    } else {
        res.status(400).json({ message: 'Name and value are required to set a cookie' });
    }
});

app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    if (Object.keys(cookies).length > 0) {
        res.status(200).json(cookies);
    } else {
        res.status(404).json({ message: 'No cookies found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use.`);
        process.exit(1);
    } else {
        throw err;
    }
});
