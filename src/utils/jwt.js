const jwt = require('jsonwebtoken');
const { JWT } = require('../config');
const { ApiError } = require('../handler');

const { SECRET, EXPIRES, ALGORITHM } = JWT;

// Generate JWT token based on user's id and role 
const generateToken = (id, role) => {
    const token = jwt.sign(
        { id, role }, 
        SECRET, 
        { expiresIn: EXPIRES, algorithm: ALGORITHM }
    );

    return token;
};

// Verify JWT token
const verifyToken = (token, next) => {
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            next(ApiError.unauthorized(err.message));
            return;
        }
    });
    return true;
};

// Decode JWT token
const decodeToken = (token, next) => {
    const verify = verifyToken(token, next);
    if (verify) {
        return jwt.decode(token);
    }
    return null;
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
};