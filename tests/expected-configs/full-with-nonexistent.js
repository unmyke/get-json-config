const full = require('./full');
const nonexistent = require('./nonexistent');

const development = {
  ...full.development.config,
  ...nonexistent.config,
};

const production = {
  ...full.production.config,
  ...nonexistent.config,
};

const test = {
  ...full.test.config,
  ...nonexistent.config,
};

const empty = {
  ...full.empty.config,
  ...nonexistent.config,
};

module.exports = {
  development: {
    config: development,
    files: full.development.files,
  },
  production: {
    config: production,
    files: full.production.files,
  },
  test: {
    config: test,
    files: full.test.files,
  },
  empty: {
    config: empty,
    files: full.empty.files,
  },
};
