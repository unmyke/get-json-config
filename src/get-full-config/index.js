const { basename } = require('path');

const readJson = require('./read-json');
const getFilePaths = require('./get-file-paths');
const ext = require('./config-ext');

const {
  codes: { FS_ERROR },
} = require('../error');

const getScopes = (scopeItems) =>
  scopeItems.reduce((prevScopes, [file, scope]) => {
    if (file !== null) {
      const envNames = Object.keys(scope);
      const scopeName = basename(file, ext);

      return envNames.reduce(
        (prevEnvsScopes, envName) => ({
          ...prevEnvsScopes,
          [envName]: {
            ...prevEnvsScopes[envName],
            [scopeName]: {
              value: scope[envName],
              file,
            },
          },
        }),
        prevScopes
      );
    }
    return prevScopes;
  }, {});

const getFullConfig = (dir) =>
  getFilePaths(dir)
    .then((filePaths) =>
      Promise.all(
        filePaths.map((file) =>
          readJson(file).then(
            (scope) => [file, scope],
            (err) => {
              if (err.code === FS_ERROR) {
                throw err;
              }

              console.warn(err.message);
              return Promise.resolve([null, {}]);
            }
          )
        )
      )
    )
    .then(getScopes)
    .catch((err) => {
      throw err;
    });

getFullConfig.sync = (dir) => {
  try {
    const filePaths = getFilePaths.sync(dir);
    const scopeItems = filePaths.map((file) => {
      try {
        const scope = readJson.sync(file);
        return [file, scope];
      } catch (err) {
        if (err.code === FS_ERROR) {
          throw err;
        }

        console.warn(err.message);
        return [null, {}];
      }
    });

    return getScopes(scopeItems);
  } catch (err) {
    throw err;
  }
};

module.exports = getFullConfig;
