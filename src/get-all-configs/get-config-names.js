const { readdir } = require('fs');
const { basename } = require('path');

const configExt = require('./config-ext');

const getConfigNames = (configDir) =>
  new Promise((resolve) => {
    readdir(configDir, (err, files) => {
      const configFiles = Array.isArray(files)
        ? files.filter((file) => file.slice(-5) === configExt)
        : [];
      if (err || !files || configFiles.length === 0) {
        console.warn(
          `There are errors while reading dir ${configDir}. Return empty array`
        );
        return resolve([]);
      }

      resolve(configFiles.map((file) => basename(file, configExt)));
    });
  });

module.exports = getConfigNames;
