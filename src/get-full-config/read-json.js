const { readFile, readFileSync } = require('fs');

const {
  getError,
  codes: { FS_ERROR, SCOPE_NOT_FOUND, SCOPE_INVALID },
} = require('../error');

const getHandledErrorMesage = (prefix) =>
  `${prefix}. Return empty objects as scope value.`;

const readJson = (file) =>
  new Promise((resolve, reject) => {
    readFile(file, (err, json) => {
      if (err) {
        if (err.code === 'ENOENT')
          return reject(
            getError(
              getHandledErrorMesage(`File ${file} doesn't extist`),
              SCOPE_NOT_FOUND
            )
          );
        return reject(getError('Unhadled file system error'), FS_ERROR);
      }

      try {
        resolve(JSON.parse(json));
      } catch (_) {
        reject(
          getError(
            getHandledErrorMesage(`File ${file} has invalid format`),
            SCOPE_INVALID
          )
        );
      }
    });
  });

readJson.sync = (file) => {
  try {
    const json = readFileSync(file);

    return JSON.parse(json);
  } catch (err) {
    if (err) {
      if (err.code === 'ENOENT')
        throw getError(
          getHandledErrorMesage(`File ${file} doesn't extist`),
          SCOPE_NOT_FOUND
        );
      if (err instanceof SyntaxError) {
        throw getError(
          getHandledErrorMesage(`File ${file} has invalid format`),
          SCOPE_INVALID
        );
      }

      throw (getError('Unhadled file system error'), FS_ERROR);
    }
  }
};

module.exports = readJson;
