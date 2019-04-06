<!-- [![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url] -->

# get-json-config

Utility for getting config object stored in `json`-files. Use as alternative to
store app configuration in `.env`-files.

## Why

Storing configuraton in `.env`-files has two drawbacks:

* flat structure
* imperative way of contructing config by parsing `process.env`

It's conveniently to have shared configuration object between different parts
of the app (for instance, server and client), but for security reasons (client
part will be deliver to browser and you not want, for instance, your
database credentals get in there) configuration per app part must contains
specific set of configuration values. Using `.env`-files enforce you to have
manual parser for `process.env` to agregate configuration object for
corresponding part of app.

Instead of imerative parsing of environment variables, `get-json-config`
propose more declarative way to get configuration object.

## API

### `getJsonConfig(names[, options])`

Takes list of `json`-files names (sections of final configuration object) and
returns Promise resolves to configuration object.

### `getJsonConfig.sync(names[, options])`

#### **Not implemented yet**

Similar behavior same way, only synchronous way.

### `names`

Type: `[String]`

Default: `[]`

Array of `json`-file names, that contains nested configuration section.

### `options`

#### `options.env`

Type: `String`

Default: `process.env.NODE_ENV || 'development'`

`json`-file have to be sepate by environment sets of values. For example:

```json
{
  development: {
    foo: 'bar',
  },
  production: {
    foo: 'foo'
  }
}
```

#### `options.configDir`

Type: `String`

Default: `./config`

Relative path to directory contains configuration `json`-files.

## Getting Started

To begin, you'll need to install `get-json-config`:

```console
$ npm install --save get-json-config
// or
$ yarn add get-json-config
```

store your configs like this:

```json
// config/api.json
{
  "production": {
    "endPoint": "/api/v1"
  },
  "development": {
    "endPoint": "/dev_api/"
  },
  "test": {
    "endPoint": "/dev_api/"
  }
}
```

```json
// config/database.json
{
  "production": {
    "host": "db.expamle.host",
    "port": 27017,
    "username": "produsername",
    "password": "prodpassword"
  },
  "development": {
    "host": "localhost",
    "port": 27017,
    "username": "devusername",
    "password": "devpassword"
  },
  "test": {
    "host": "localhost",
    "port": 27117,
    "username": "testusername",
    "password": "testpassword"
  }
}
```

in your app call getJsonConfig:

```js
// src/server.js
const getJsonConfig from ('get-json-config');

const configNames = ["api", "database"];
const configDir = './config'
const env = process.env.NODE_ENV;

getJsonConfigs({ names: configName, env, configDir })
  .then(config => {
    // ...your code
  })

// sync
const config = getJsonConfigs.sync({ names: configName, env, configDir })
```

```js
// src/client.js
const getJsonConfig from ('get-json-config');

const configNames = ["api"];
const configDir = './config'
const env = process.env.NODE_ENV;

getJsonConfigs({ names: configName, env, configDir })
  .then(config => {
    // ...your code
  })

// sync
const config = getJsonConfigs.sync({ names: configName, env, configDir })
```

So you may use configuration object in app, for instance, put it to DI container.

To load configuration object to bundle by webpack use [fullstack-config-loader].

## License

### [MIT](./LICENSE)

<!-- [npm]: https://img.shields.io/npm/v/get-json-config.svg
[npm-url]: https://npmjs.com/package/get-json-config
[node]: https://img.shields.io/node/v/get-json-config.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/get-json-config.svg
[deps-url]: https://david-dm.org/webpack-contrib/get-json-config
[tests]: https://img.shields.io/circleci/project/github/webpack-contrib/get-json-config.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/get-json-config
[cover]: https://codecov.io/gh/webpack-contrib/get-json-config/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/get-json-config
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack -->
[fullstack-config-loader]: https://github.com/unmyke/fullstack-config-loader
