const full = require('./full');

module.exports.development = {
  api: full.development.api,
  web: full.development.web,
};

module.exports.production = {
  api: full.production.api,
  web: full.production.web,
};

module.exports.test = {
  api: full.test.api,
  web: full.test.web,
};

module.exports.empty = {
  api: {},
  web: {},
};
