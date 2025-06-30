require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');


const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (re, res) => {
    res.send("Api is working fine");
})

connectDB();

app.use(express.json());

app.listen('/', () => {
    console.log(`Server is listening on port ${PORT}`);
})