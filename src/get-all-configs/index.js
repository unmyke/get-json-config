const readConfig = require('./read-config');
const getConfigNames = require('./get-config-names');

const getAllConfigs = (configDir) =>
  getConfigNames(configDir)
    .then((configNames) =>
      Promise.all(
        configNames.map((name) =>
          readConfig({ name, configDir }).then((config) => [name, config])
        )
      )
    )
    .then((configItems) => {
      const envNames = [
        ...configItems.reduce(
          (envNames, [, config]) =>
            new Set([...envNames, ...Object.keys(config)]),
          new Set()
        ),
      ];

      return envNames.reduce(
        (configs, envName) => ({
          ...configs,
          [envName]: configItems.reduce(
            (envConfig, [configName, config]) => ({
              ...envConfig,
              [configName]: config[envName],
            }),
            {}
          ),
        }),
        {}
      );
    });

module.exports = getAllConfigs;
