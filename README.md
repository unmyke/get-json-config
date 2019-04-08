<!-- [![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url] -->

# get-json-config

Utility for getting config object stored in `json`-files. Use as alternative to
store app configuration in `.env`-files.

## Why

Historically app configuraton store in environment variables. If your configuration values have to be scoped (for instance, `mongodb` and `experess` hostname and port) you can name the variables by including scope name (for instance, prefex every value with scope name like `DB_HOTS`, `DB_PORT`, `HTTP_HOST`, `HTTP_PORT`). When number of variables starts grow you may prefer use `.env`-files for different separated by evnironment name (`.env.production`, `.env.development`, `.env.test`) and load it by [dotenv] or another tools instead to pass all environment variable directly in terminal or line it in `script` section of `package.json`.

But using `.env`-files has drawbacks to:

* flat structure of valiable names, your scoped nature of configuration has to be injected in variable name
* different set of configuration values separate by environment names
* values can store only `String`
* imperative way of contructing config inside app by manual parsing `process.env`

Another point of vision to store configuration values in `json`-files. By using `get-json-config` configuration separate by scopes, and every scope have sets of values separated by environment names.

```json
// config/database.json
{
  "production": {
    "name": "production",
    "hostname": db.exapmle.com,
    "port": 27017,
  },
  "development": {
    "name": "development",
    "hostname": loaclhost,
    "port": 27017,
  }
}
```

```json
// config/http.json
{
  "production": {
    "hostname": exapmle.com,
    "port": 80,
  },
  "development": {
    "hostname": loaclhost,
    "port": 8080,
  }
}
```

Using `'scope-name'.json` you may have deep nested values inside scope, you get all environment-depending value sets in one file, if you need to add some variables in scope there is no need to switch between `.env.'envname'` files.

Also, there is a security problem to share scopes of configuration between different parts of you app, for instance, your app have client and server parts need to have access to values in web-server scope, but client must not includes values of database scope, because client code will be send to browser. By using environment variable you manualy parse `process.env` to get only needed values. By using `get-json-config` you pass list of scopes and get configuration object, contained only values needed (your may have 'common', 'server' and 'client' scopes, but more declarative divide you scopes by purpose and you must contorol what values contains in scopes shared beteewn client and server parts).

Only environment variable you may to use is standard NODE_ENV (or you have to pass it's value as an option in call of `get-json-config`).

## API

### `getJsonConfig([scopes, options])`

Returns: `Promise`

Takes list of `json`-files names (sections of final configuration object) and
returns Promise resolves to object { `config`, `files` }. If names is not passed it returns all scopes in directory.

#### `config`

Type: `object`

Contains scoped names properties with values equal `'scope-name'.json`. If `'scope-name'.json` file not found, property will be empty `Object`.

#### `files`

Type: `Array`

Contains list of relative file names that was found while including to `config`;

### `getJsonConfig.sync([scopes, options])`

#### **Not implemented yet**

Similar behavior only synchronous way.

### `scopes`

Type: `[String]`

Default: `[]`

Array of `json`-file names (scopes), that contains nested configuration section.

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

#### `options.dir`

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

const scopes = ["api", "database"];
const configDir = './config'
const env = process.env.NODE_ENV;

getJsonConfigs(scopes, { env, configDir })
  .then(config => {
    // ...your code
  })

// sync
const config = getJsonConfigs.sync(scopes, { env, configDir })
```

```js
// src/client.js
const getJsonConfig from ('get-json-config');

const scopes = ["api"];
const configDir = './config'
const env = process.env.NODE_ENV;

getJsonConfigs(scopes, { env, configDir })
  .then(config => {
    // ...your code
  })

// sync
const config = getJsonConfigs.sync(scopes, { env, configDir })
```

So you may use configuration object in app, for instance, put it to DI container.

[app-json-config-loader] uses 'get-json-conig' to load configuration object to bundle via [webpack].

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
[app-json-config-loader]: https://github.com/unmyke/app-json-config-loader
[webpack]: https://webpack.js.org/
[dotenv]: https://github.com/motdotla/dotenv
