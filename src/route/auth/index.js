const express = require('express');
const router = express.Router();

const { register, login } = require('../../controller/auth');
const { 
    loginValidator,
    registerValidator
} = require('../../controller/auth/validation');

router.post('/login', loginValidator, login);
router.post('/register', registerValidator, register);

module.exports = router;
