const productController = require('./product.controller');
const productValidator = require('./validation/product.validator');

module.exports = {
    ...productValidator,
    ...productController
}