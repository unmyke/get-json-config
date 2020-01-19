# get-json-config

Utility to read app config stored in JSON-files as alternative of usage `.env`-files.

## Why

According to [The Twelve-Factor App](https://12factor.net/en/config) app config should not be hardcoded, most convenient option is parse config from environment variables inside app. Thus, the convenience of app configuring for various environments is achieved, which means profit for app CI/CD. Every app needs to be configured, so every time `config` function from [dotenv](https://github.com/motdotla/dotenv#readme) package helps me to get object with environment variables.

Nevertheless, this object had to be trasformed to specific for app shape: one app needs to get the config of the database server and api-server, when other setups two external services and ElasticSearch server). Usually, parsed from object with environment variables config object is a dictionary, that contains module configs. Why not initially store configs in this form? And the `json`-files are best suited for this.

### Too verbose naming for environment variables

When app configs by module specific params for instance, db, endpoint, third-party services in a lot, you have to name environment variables same way.

```shell
# .env

# Database config
...
DB_HOST=db.example.com
DB_PORT=5432
DB_USERNAME=dbuser
DB_PASSWORD=dbpassword
...

# Endpoint config
...
ENDPOINT_HOST=example.com
ENDPOINT_PORT=80
...

# External service config
...
EXT_SERVICE_TOKEN=secret_token
...
```

Split config into "scoped" `json`-files (app module configs) simplifies the naming of conf params. Such a `json`-file can literally fits the shape of config of module you used .

```json
// database.json
{
  ...
  "host": "db.example.com",
  "port": 5432,
  "username": "dbuser",
  "password": "dbpassword",
  ...
}

// endpoint.json
{
  ...
  "host": "example.com",
  "port ": 80
  ...
}

// ext-service.json
{
  ...
  "token": "secret_token"
  ...
}
```

#### Configs separates by environment instead of scopes

To load app configs using `dotenv`, you split configs into`.env` files for different environments. As the number of conf params increases, adding new params to different .env files becomes inconvenient.

`get-json-config` separates different environment configs inside of module config `json`-file.

Example of `.env`-files:

```shell
# .env
DB_HOST=db.company.org
DB_NAME=production
DB_USERNAME=dbuser
DB_PASSWORD=dbpassword
DB_PORT=5432
ENDPOINT_HOST=company.org
ENDPOINT_PORT=3000
ENDPOINT_GRAPHQL_URI=/graphql

# .env.developmnet
DB_HOST=localhost
DB_NAME=test
DB_USERNAME=dbuser
DB_PASSWORD=dbpassword
DB_PORT=6432
ENDPOINT_HOST=localhost
ENDPOINT_PORT=4000
ENDPOINT_GRAPHQL_URI=/graphql/develop
```

`json`-files analog:

```json
// configs/.database.json
{
  "production": {
    "host": "db.company.org",
    "name": "production",
    "username": "dbuser",
    "password": "dbpassword",
    "port": 5432
  },
  "development": {
    "host": "localhost",
    "name": "development",
    "username": "dbuser",
    "password": "dbpassword",
    "port": 6432
  }
}
// configs/endpoint.json
{
  "production": {
    "endpointHost": "company. org",
    "endpointPort": 3000,
    "endpointGraphqlUri": "/graphql"
  },
  "development": {
    "endpointHost": "localhost",
    "endpointPort": 4000,
    "endpointGraphqlUri": "/graphql/develop"
  }
}
```

Thus, new conf param adds inside only one file.

### Flat config structure of `env`-file

The `.env`-file is a list of environment variables, which makes it impossible to have a nested params. If the config object of the scope module has nested conf params, then a manual, iterative approach is required when parsing the environment variables to construct config object. The `json`-file have no such a problem at all.

## Usage

Use standard NODE_ENV only (or pass { env } name to `get-json-config`).

### API

#### `getJsonConfig([scopes, options])`

Returns: `Promise`

Takes list of `json`-files names (sections of final config object) and
returns Promise resolves to object { `config`, `files` }. If scope names is not passed it returns all scopes in directory.

##### `config`

Type: `object`

Contains scoped name properties with values equal `'scope-name'.json`. If `'scope-name'.json` file not found, property will be empty `Object`.

##### `files`

Type: `Array`

Contains list of relative file names that was found while including to `config`.

#### `getJsonConfig.sync([scopes, options])`

Similar behavior only in synchronous way.

#### `scopes`

Type: `[String]`

Array of `json`-file names (scopes), that contains nested config section. If not passed will return all config in [`options.dir`].

#### `options`

##### `options.env`

Type: `String`

Default: `process.env.NODE_ENV || 'development'`

`json`-file have to be sepate by environment sets of values. For example:

```json
{
  "development": {
    "foo": "bar"
  },
  "production": {
    "foo": "foo"
  }
}
```

##### `options.dir`

Type: `String`

Default: `./config`

Relative path to directory contains config `json`-files.

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

So you may use config object in app, for instance, put it to DI container.

[app-json-config-loader] uses `get-json-config` to load config object to bundle via [webpack].

## License

### [MIT](./LICENSE)

[app-json-config-loader]: https://github.com/unmyke/app-json-config-loader
[webpack]: https://webpack.js.org/
[dotenv]: https://github.com/motdotla/dotenv
