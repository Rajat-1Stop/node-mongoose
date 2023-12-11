const productController = require('./product.controller');
const inventoryController = require('./inventory.controller');
const productValidator = require('./validation/product.validator');
const inventoryValidator = require('./validation/inventory.validator');

module.exports = {
    ...productValidator,
    ...productController,
    ...inventoryValidator,
    ...inventoryController,
}