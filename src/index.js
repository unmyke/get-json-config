const getFullConfig = require('./get-full-config');
const extractScopes = require('./extract-scopes');
const getErrorHandler = require('./get-error-handler');
const parseArgs = require('./parse-args');
const injectMode = require('./inject-mode');

const getJsonConfig = (...args) => {
  const { scopeNames, env, dir } = parseArgs(args);

  return getFullConfig(dir)
    .then((scopes) =>
      injectMode(extractScopes({ scopeNames, scopes, env, dir }), env)
    )
    .catch(getErrorHandler(scopeNames));
};

getJsonConfig.sync = (...args) => {
  const { scopeNames, env, dir } = parseArgs(args);

  try {
    const scopes = getFullConfig.sync(dir);
    return injectMode(extractScopes({ scopeNames, scopes, env, dir }), env);
  } catch (err) {
    return getErrorHandler(scopeNames)(err);
  }
};

module.exports = getJsonConfig;
