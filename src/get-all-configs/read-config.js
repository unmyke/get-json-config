const { format } = require('path');
const { readFile } = require('fs');

const configExt = require('./config-ext');

const readJson = (pathToJson) =>
  new Promise((resolve, reject) => {
    readFile(pathToJson, (error, data) => {
      if (error) {
        console.warn(error);
        return reject(error);
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
  });

const readConfig = ({ name, configDir }) =>
  readJson(format({ dir: configDir, name, ext: configExt })).catch((err) => {
    console.warn(
      `There are errors while reading config ${configDir}. Return empty object.
        Error:`,
      err
    );
    return {};
  });

module.exports = readConfig;
