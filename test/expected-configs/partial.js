const full = require('./full');
const files = require('./files-partial');

const development = {
  api: full.development.config.api,
  web: full.development.config.web,
};

const production = {
  api: full.production.config.api,
  web: full.production.config.web,
};

const test = {
  api: full.test.config.api,
  web: full.test.config.web,
};

const empty = {
  api: {},
  web: {},
};

module.exports = {
  development: {
    config: development,
    files,
  },
  production: {
    config: production,
    files,
  },
  test: {
    config: test,
    files,
  },
  empty: {
    config: empty,
    files: [],
  },
};
