const express = require('express');
const { registerController, loginController, logout } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register',registerController);
authRouter.post('/login',loginController);
authRouter.get('/logout',logout)


module.exports = authRouter;