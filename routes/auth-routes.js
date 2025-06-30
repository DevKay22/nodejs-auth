const express = require('express');

const { registerUser, loginUser } = require('../controllers/auth-controller')

const authRouter = express.Router();

//All routes are related to authentication and authorization
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser);

module.exports = authRouter;
