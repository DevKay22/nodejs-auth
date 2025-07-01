require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');

const app = express();

const PORT = process.env.PORT || 8080;

// test base route
app.get('/', (req, res) => {
    res.send("API is working fine");
});

connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);

// start server
app.listen(3350, () => {
    console.log(`✅ Server is listening on port ${PORT}`);
});
