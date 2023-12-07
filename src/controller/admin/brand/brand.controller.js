const bcrypt = require('bcrypt');
const { ApiError, ok } = require('../../../handler');
const { Brand } = require('../../../model');

// ============================================================

const getBrands = async (req, res, next) => {
    try {
        const {page = 0, order = 'desc', orderBy = 'createdAt', rowsPerPage = 10} = req.body;

        const sortOrder = order === 'desc' ? -1 : 1;
        const sortBy = orderBy === 'createdAt' ? 'createdAt' : orderBy;

        const brands = await Brand.find({})
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(rowsPerPage))
            .skip(parseInt(rowsPerPage) * parseInt(page));

        ok(res, 'Brands fetched successfully.', brands);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const getBrand = async (req, res, next) => {
    try {
        const id = req.params.id;
        const brand = await Brand.findById(id);
        if (!brand) {
            throw new Error('Brand not found');
        }

        ok(res, 'Brands get successfully', brand);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const addBrand = async (req, res, next) => {
    try {
        const data = req.body;

        // Create brand
        const brand = await Brand.create(data);
        ok(res, 'Brand created successfully', brand);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const deleteBrand = async (req, res, next) => {
    try {
        const id = req.params.id;
        const brand = await Brand.findById(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        // Soft delete the brand
        brand.softDelete();
        ok(res, 'Brand deleted successfully');
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

module.exports = {
    getBrand,
    getBrands,
    addBrand,
    deleteBrand,
};