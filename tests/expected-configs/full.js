const files = require('./files-full');

const development = {
  api: {
    host: 'localhost',
    port: 4000,
    uri: '/api',
  },
  database: {
    host: 'db.localhost',
    port: 27017,
  },
  logging: {
    path: './logs/development.log',
    mode: 'debug',
  },
  web: {
    host: 'localhost',
    port: 8080,
  },
};
const production = {
  api: {
    host: 'localhost',
    port: 4000,
    uri: '/api',
  },
  database: {
    host: 'db.localhost',
    port: 27017,
  },
  logging: {
    path: './logs/production.log',
    mode: 'warning',
  },
  web: {
    host: 'treetrunk.ru',
    port: 80,
  },
};

const test = {
  api: {
    host: 'api.test.localhost',
    port: 4000,
    uri: '/api',
  },
  database: {
    host: 'db.test.localhost',
    port: 27017,
  },
  logging: {
    path: './logs/test.log',
    mode: 'info',
  },
  web: {
    host: 'localhost',
    port: 8080,
  },
};

const empty = {
  api: {},
  database: {},
  logging: {},
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
