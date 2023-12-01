// models/user.js
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { ApiError } = require('../handler');

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unisex'],
        default: 'male',
    },
    image: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

// Concatenating firstName and lastName to generate 'name' field
userSchema.pre('save', function (next) {
    this.name = `${this.firstName} ${this.lastName}`;
    next();
});

// Soft delete method
userSchema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
};

// Define the global query middleware
userSchema.pre('find', function() {
    // 'this' refers to the query being executed
    this.where({ 
        role: { $ne: 'admin' },
        deletedAt: { $eq: null } 
    });
});

// Exclude some field from response
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.deletedAt;
    return userObject;
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return next(ApiError.badRequest(error.message));
    }
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
