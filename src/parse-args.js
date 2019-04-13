const { resolve } = require('path');

const defaultArgs = {
  scopeNames: undefined,
  env: process.env.NODE_ENV || 'development',
  dir: resolve(process.cwd(), './config'),
};

module.exports = (args) => {
  if (args.length === 0) return defaultArgs;
  if (args.length === 1) {
    if (Array.isArray(args[0])) {
      const { env, dir } = defaultArgs;

      return {
        scopeNames: args[0],
        env,
        dir,
      };
    }
    if (args[0] instanceof Object) {
      const { scopeNames, env: defaultEnv, dir: defaultDir } = defaultArgs;
      const { env, dir } = args[0];

      return {
        scopeNames,
        env: env || defaultEnv,
        dir: dir || defaultDir,
      };
    }
  }

  const { env: defaultEnv, dir: defaultDir } = defaultArgs;
  const [scopeNames, { env, dir }] = args;

  return {
    scopeNames,
    env: env || defaultEnv,
    dir: dir || defaultDir,
  };
};
