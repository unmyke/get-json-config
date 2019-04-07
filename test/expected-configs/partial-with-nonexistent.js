const partial = require('./partial');
const nonexistent = require('./nonexistent');
const files = require('./files-partial');

const development = {
  ...partial.development.config,
  ...nonexistent.config,
};

const production = {
  ...partial.production.config,
  ...nonexistent.config,
};

const test = {
  ...partial.test.config,
  ...nonexistent.config,
};

const empty = {
  ...partial.empty.config,
  ...nonexistent.config,
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
