const bcrypt = require('bcrypt');
const { ok, ApiError } = require('../../handler');
const { generateToken } = require('../../utils/jwt');

const User = require('../../model/user');

// ============================================================

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = req.body;

        data.password = await bcrypt.hash(password, 10);
        delete data.confirmPassword;

        // Verify the email is exist
        const checkUnique = await User.findOne({ email: email });
        if (checkUnique) {
            next(ApiError.badRequest('Email already exists'));
            return;
        }

        const user = await User.create(data);
        const token = await generateToken(user._id, user.role);
        
        return ok(res, 'Register success', user, token);
    } catch (error) {
        return next(ApiError.internal(error.message));
    }
}

module.exports = {register};