const express = require('express');

const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller')

const authRouter = express.Router();
const authMiddleware = require('../middleware/auth-middleware')

//All routes are related to authentication and authorization
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser);
authRouter.post('/changePassword', authMiddleware, changePassword);

module.exports = authRouter;
