const jwt = require('./jwt');
const validationRule = require('./validation');

module.exports = {
    ...jwt,
    ...validationRule,
}