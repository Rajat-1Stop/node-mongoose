// models/product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    description: {
        type: String,
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
productSchema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
};

// Define the global query middleware
productSchema.pre('find', function() {
    this.populate({
        path: 'brandId',
        match: { deletedAt: null }, // Match condition to check if the brand is not deleted
    });
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
