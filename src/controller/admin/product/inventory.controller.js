const { ApiError, ok } = require('../../../handler');
const { ProductInventory } = require('../../../model');

const getProductInventories = async (req, res, next) => {
    try {
        const {order = 'desc', orderBy = 'createdAt', productId = null} = req.body;

        const sortOrder = order === 'desc' ? -1 : 1;
        const sortBy = orderBy === 'createdAt' ? 'createdAt' : orderBy;

        let query = {};

        if (productId) {
            query.productId = productId;
        }

        const inventories = await ProductInventory.find(query).sort({ [sortBy]: sortOrder });
        ok(res, 'Inventory fatched successfully');
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const addInventory = async (req, res, next) => {
    try {
        const data = req.body;

        // Create product inventory
        const inventory = await ProductInventory.create(data);
        ok(res, 'Inventory created successfully', inventory);
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

const deleteInventory= async (req, res, next) => {
    try {
        const id = req.params.id;
        const inventory = await ProductInventory.findById(id);
        if (!inventory) {
            throw new Error('Inventory not found');
        }

        // Soft delete the product
        inventory.softDelete();
        ok(res, 'Inventory deleted successfully');
        return;
    } catch (error) {
        next(ApiError.internal(error.message));
        return;
    }
}

module.exports = {
    addInventory,
    deleteInventory,
    getProductInventories,
};