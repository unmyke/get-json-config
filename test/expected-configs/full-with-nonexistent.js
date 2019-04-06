const full = require('./full');
const nonexistent = require('./nonexistent');

module.exports.development = {
  ...full.development,
  ...nonexistent,
};

module.exports.production = {
  ...full.production,
  ...nonexistent,
};

module.exports.test = {
  ...full.test,
  ...nonexistent,
};

module.exports.empty = {
  ...full.empty,
  ...nonexistent,
};
