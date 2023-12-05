// models/product.js
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { ApiError } = require('../handler');

const productSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
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

// Soft delete method
productSchema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
};

// Define the global query middleware
productSchema.pre('find', function() {
    // 'this' refers to the query being executed
    this.where({ 
        deletedAt: { $eq: null } 
    });
});

// Exclude some field from response
productSchema.methods.toJSON = function () {
    const productObject = this.toObject();
    delete productObject.deletedAt;
    return productObject;
};

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
