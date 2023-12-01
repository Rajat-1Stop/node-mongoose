const User = require('../model/user');
const { ApiError } = require('../handler');
const { decodeToken } = require('../utils/jwt');

// Create auth middleware to check token from client
const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            next(
                ApiError.unauthorized('You are not authorized to access this resource.')
            );
            return;
        }
        const token = req.headers.authorization.split(' ');

        if (token[0] !== 'Bearer') {
            next(
                ApiError.unauthorized('You are not authorized to access this resource.')
            );
            return;
        }

        const decode_token = await decodeToken(token[1], next);
        if (!decode_token) {
            return next(ApiError.unauthorized('Token is not valid.'));
        }
        
        req.user = null;
        const user = await User.findById(decode_token.id);
        if (!user) {
            return next(ApiError.unauthorized('Token is not valid.'));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(ApiError.internal(error.message));
    }
};

module.exports = {auth};