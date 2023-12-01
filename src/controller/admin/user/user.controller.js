const bcrypt = require('bcrypt');
const { ApiError, ok } = require('../../../handler');
const User = require('../../../model/user');

// ============================================================

const getUsers = async (req, res, next) => {
    try {
        const {page = 0, order = 'desc', orderBy = 'createdAt', rowsPerPage = 10} = req.body;

        const sortOrder = order === 'desc' ? -1 : 1;
        const sortBy = orderBy === 'createdAt' ? 'createdAt' : orderBy;

        const users = await User.find({})
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(rowsPerPage))
            .skip(parseInt(rowsPerPage) * parseInt(page));

        ok(res, 'Users fetched successfully.', users);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        ok(res, 'User deleted successfully');
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const defaultPass = `${data.firstName}@123`;
        
        // Create user
        const user = await User.create({
            ...data,
            password: bcrypt.hashSync(defaultPass, 10),
        });
        
        ok(res, 'Customer created successfully', user);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
};

const updateUser = async (req, res, next) => {
    try {
        const {_id} = req.body;
        const data = req.body;

        const user = await User.findOneAndUpdate({ _id: _id }, data);
        ok(res, 'Customer created successfully', user);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        // Soft delete the user
        user.softDelete()
        ok(res, 'User deleted successfully');
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

module.exports = {
    getUser,
    addUser,
    getUsers,
    deleteUser,
    updateUser,
};