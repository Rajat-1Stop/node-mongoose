const errorHandlers = require('./error');
const successHandlers = require('./success');

module.exports = {
  ...errorHandlers,
  ...successHandlers
};
