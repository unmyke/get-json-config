const { readdir } = require('fs');
const { format, extname } = require('path');

const configExt = require('./config-ext');
const {
  getError,
  codes: { DIR_NOT_FOUND },
} = require('../error');

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

      const configFiles = Array.isArray(files)
        ? files.filter((file) => extname(file) === configExt)
        : [];

      resolve(configFiles.map((base) => format({ base, dir })));
    });
  });

module.exports = getConfigNames;
