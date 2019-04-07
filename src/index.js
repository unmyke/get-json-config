const { resolve } = require('path');
const getFullConfig = require('./get-full-config');
const {
  codes: { DIR_NOT_FOUND },
} = require('./error');

const getJsonConfig = (
  scopeNames = [],
  {
    env = process.env.NODE_ENV || 'development',
    dir = resolve(process.cwd(), './config'),
  } = {}
) =>
  getFullConfig(dir)
    .then((scopes) =>
      scopeNames.reduce(
        ({ config: prevConfig, files: prevFiles }, scopeName) => {
          let scope;
          let newFiles;

          if (!scopes[env] || !scopes[env][scopeName]) {
            const message = !scopes[env]
              ? `Environment ${env} doesn't declare in scope files`
              : `Config file "${scopeName}" doesn't exist in directory "${dir}"`;
            console.warn(`${message}. Return empty object.`);
            scope = {};
            newFiles = [...prevFiles];
          } else {
            const { value, file } = scopes[env][scopeName];
            scope = value;
            newFiles = [...prevFiles, file];
          }

          return {
            config: {
              ...prevConfig,
              [scopeName]: scope,
            },
            files: newFiles,
          };
        },
        { config: {}, files: [] }
      )
    )
    .catch((err) => {
      if (err.code === DIR_NOT_FOUND) {
        console.warn(err.message);
        return scopeNames.reduce(
          (prevConfig, scopeName) => ({
            config: {
              ...prevConfig.config,
              [scopeName]: {},
            },
            files: [],
          }),
          { config: {} }
        );
      }

      throw err;
    });

module.exports = getJsonConfig;
