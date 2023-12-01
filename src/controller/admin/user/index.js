const userController = require('./user.controller');
const userValidator = require('./validation/user.validator');

module.exports = {
    ...userController,
    ...userValidator
}