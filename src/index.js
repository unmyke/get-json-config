const path = require('path');
const getAllConfigs = require('./get-all-configs');

const getJsonConfig = (
  names = [],
  {
    env = process.env.NODE_ENV || 'development',
    configDir = path.resolve(process.cwd(), './config'),
  } = {}
) =>
  getAllConfigs(configDir).then((configs) =>
    names.reduce((targetConfigs, configName) => {
      let config;

      if (!configs[env] || !configs[env][configName]) {
        console.warn(
          `There are errors while reading config "${configName}" from ${configDir}. Return empty object.`
        );
        config = {};
      } else config = configs[env][configName];

      return {
        ...targetConfigs,
        [configName]: config,
      };
    }, {})
  );

module.exports = getJsonConfig;
