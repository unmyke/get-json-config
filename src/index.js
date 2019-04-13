const { resolve } = require('path');
const getFullConfig = require('./get-full-config');
const extractScopes = require('./extract-scopes');
const getErrorHandler = require('./get-error-handler');

const getJsonConfig = (
  scopeNames = [],
  {
    env = process.env.NODE_ENV || 'development',
    dir = resolve(process.cwd(), './config'),
  } = {}
) =>
  getFullConfig(dir)
    .then((scopes) => extractScopes({ scopeNames, scopes, env, dir }))
    .catch(getErrorHandler(scopeNames));

getJsonConfig.sync = (
  scopeNames = [],
  {
    env = process.env.NODE_ENV || 'development',
    dir = resolve(process.cwd(), './config'),
  } = {}
) => {
  try {
    const scopes = getFullConfig.sync(dir);
    return extractScopes({ scopeNames, scopes, env, dir });
  } catch (err) {
    return getErrorHandler(scopeNames)(err);
  }
};

module.exports = getJsonConfig;
