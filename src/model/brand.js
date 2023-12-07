// models/brand.js
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { getTime } = require('date-fns');
const { ApiError } = require('../handler');
const { APP_URL } = require('../config');
const { uploadSingle } = require('../utils');

const brandSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
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
brandSchema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
};

// Define the global query middleware
brandSchema.pre('find', function() {
    // 'this' refers to the query being executed
    this.where({ 
        deletedAt: { $eq: null } 
    });
});

// Save image in public folder
brandSchema.pre('save', async function (next) {
    if (this.image && this.isModified('image') && this.image.startsWith('data:image/')){
        const matches = this.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches || matches.length === 3){
            const fileName = `${getTime(new Date())}_${Math.floor(1000 + Math.random() * 9000)}.jpeg`
            const uploaded = uploadSingle({
                file: matches,
                folder: 'brand',
                fileName: fileName,
            }, next);
            
            if (uploaded) {
                this.image = fileName;
            }
        }
    }
});

// Exclude some field from response
brandSchema.methods.toJSON = function () {
    const brandObject = this.toObject();
    delete brandObject.deletedAt;

    brandObject.imageUrl = null;
    if(brandObject.image) {
        brandObject.imageUrl = `${APP_URL}/uploads/brand/${brandObject.image}`;
    }    
    return brandObject;
};

const Brand = mongoose.model('Brand', brandSchema, 'brands');

module.exports = Brand;
