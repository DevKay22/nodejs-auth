require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth-routes')


const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (re, res) => {
    res.send("Api is working fine");
})

connectDB();

app.use(express.json());
app.use('/api/user', authRoutes)

app.listen('/', () => {
    console.log(`Server is listening on port ${PORT}`);
})