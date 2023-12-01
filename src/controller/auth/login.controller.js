const { ok, ApiError } = require('../../handler');
const { generateToken } = require('../../utils/jwt');

const User = require('../../model/user');

// ============================================================

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check email
        const user = await User.findOne({ email: email });
        if (!user) {
            next(ApiError.badRequest('Email does not exist.'));
            return;
        }
        // Check password
        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
            next(ApiError.badRequest('Email or password is incorrect.'));
            return;
        }
        
        // Generate token
        const token = await generateToken(user._id, user.role);
        // Return response to client
        // delete user.password;
        return ok(res, 'You are login successfully.', user, token);
    } catch (error) {
        return next(ApiError.internal(error.message));
    }
}

module.exports = {login};