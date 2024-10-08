const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const authMiddleware = require('./middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/protected', authMiddleware, protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} for task-32`));
