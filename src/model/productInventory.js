// models/productInventory.js
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// const { ApiError } = require('../handler');

const { Schema } = mongoose;

const productInventorySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false
    },
    total_quantity: {
        type: Number,
        required: true,
    },
    availabel_quantity: {
        type: Number,
        required: false,
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
productInventorySchema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
};

// Define the global query middleware
productInventorySchema.pre('find', function() {
    // 'this' refers to the query being executed
    this.where({ 
        deletedAt: { $eq: null } 
    });
});

// Exclude some field from response
productInventorySchema.methods.toJSON = function () {
    const productInventoryObject = this.toObject();
    delete productInventoryObject.deletedAt;
    return productInventoryObject;
};

const ProductInventory = mongoose.model('ProductInventory', productInventorySchema, 'productInventories');

module.exports = ProductInventory;
