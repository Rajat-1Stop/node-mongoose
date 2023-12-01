const authMiddleware = require('./auth');
const roleMiddleware = require('./role');

module.exports = {
    ...roleMiddleware,
    ...authMiddleware
}