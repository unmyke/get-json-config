const partial = require('./partial');
const nonexistent = require('./nonexistent');

module.exports.development = {
  ...partial.development,
  ...nonexistent,
};

module.exports.production = {
  ...partial.production,
  ...nonexistent,
};

module.exports.test = {
  ...partial.test,
  ...nonexistent,
};

module.exports.empty = {
  ...partial.empty,
  ...nonexistent,
};
