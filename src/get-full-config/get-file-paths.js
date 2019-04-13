const { readdir, readdirSync } = require('fs');
const { format, extname } = require('path');

const configExt = require('./config-ext');
const {
  getError,
  codes: { DIR_NOT_FOUND },
} = require('../error');

const getConfigFiles = (files, dir) =>
  Array.isArray(files)
    ? files
        .filter((file) => extname(file) === configExt)
        .map((base) => format({ base, dir }))
    : [];

const getConfigNames = (dir) =>
  new Promise((resolve, reject) => {
    readdir(dir, (err, files) => {
      if (err) {
        return reject(
          getError(
            `Directory "${dir}" doesn't extist. Return configuration with empty objects as scope props.`,
            DIR_NOT_FOUND
          )
        );
      }

      resolve(getConfigFiles(files, dir));
    });
  });

getConfigNames.sync = (dir) => {
  try {
    return getConfigFiles(readdirSync(dir), dir);
  } catch (err) {
    throw getError(
      `Directory "${dir}" doesn't extist. Return configuration with empty objects as scope props.`,
      DIR_NOT_FOUND
    );
  }
};

module.exports = getConfigNames;
