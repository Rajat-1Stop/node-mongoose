const jwt = require('./jwt');
const upload = require('./upload');
const convertFile = require('./convertFile');
const validationRule = require('./validation');

module.exports = {
    ...jwt,
    ...upload,
    ...convertFile,
    ...validationRule,
}