const { ApiError, ok } = require('../../../handler');
const { Product } = require('../../../model');

// ============================================================

const getProducts = async (req, res, next) => {
    try {
        const { page = 0, order = 'desc', orderBy = 'createdAt', rowsPerPage = 10 } = req.body;

        const sortOrder = order === 'desc' ? -1 : 1;
        const sortBy = orderBy === 'createdAt' ? 'createdAt' : orderBy;

        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brandId',
                    foreignField: '_id',
                    as: 'brand'
                }
            }, 
            {
                $match: {
                    'brand.deletedAt': { $eq: null }
                }
            },
            {
                $lookup: {
                    from: 'productInventories',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'inventory'
                }
            },            
            {
                $addFields: {
                    brand: { $arrayElemAt: ['$brand', 0] }
                },
            },
            {
                $sort: { [sortBy]: sortOrder },
            },
            {
                $skip: parseInt(rowsPerPage) * (parseInt(page) - 1)
            },
            {
                $limit: parseInt(rowsPerPage)
            }
        ]);

        ok(res, 'Products fetched successfully.', products);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        ok(res, 'Products get successfully', product);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;

        // Create product
        const product = await Product.create(data);
        ok(res, 'Product created successfully', product);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        // Soft delete the product
        product.softDelete();
        ok(res, 'Product deleted successfully');
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

module.exports = {
    getProduct,
    getProducts,
    addProduct,
    deleteProduct,
};