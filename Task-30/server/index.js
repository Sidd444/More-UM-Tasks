const express = require('express');
const middleware = require('./middleware');

const app = express();
const port = 3000;

middleware(app);

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
