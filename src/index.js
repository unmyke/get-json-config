const getFullConfig = require('./get-full-config');
const extractScopes = require('./extract-scopes');
const getErrorHandler = require('./get-error-handler');
const parseArgs = require('./parse-args');

const getJsonConfig = (...args) => {
  const { scopeNames, env, dir } = parseArgs(args);

  return getFullConfig(dir)
    .then((scopes) => extractScopes({ scopeNames, scopes, env, dir }))
    .catch(getErrorHandler(scopeNames));
};

getJsonConfig.sync = (...args) => {
  const { scopeNames, env, dir } = parseArgs(args);

  try {
    const scopes = getFullConfig.sync(dir);
    return extractScopes({ scopeNames, scopes, env, dir });
  } catch (err) {
    return getErrorHandler(scopeNames)(err);
  }
};

module.exports = getJsonConfig;
