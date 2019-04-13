const getEmptyConfig = require('./get-empty-config');
const {
  codes: { DIR_NOT_FOUND },
} = require('./error');

module.exports = (scopeNames) => (err) => {
  if (err.code === DIR_NOT_FOUND) {
    console.warn(err.message);
    return getEmptyConfig(scopeNames);
  }

  throw err;
};
