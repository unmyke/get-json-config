module.exports.development = {
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
module.exports.production = {
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

module.exports.test = {
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

module.exports.empty = {
  api: {},
  database: {},
  logging: {},
  web: {},
};
