const brandController = require('./brand.controller');
const brandValidator = require('./validation/brand.validator');

module.exports = {
    ...brandValidator,
    ...brandController
}