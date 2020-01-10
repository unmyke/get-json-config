const injectMode = ({ config, files }, env) => ({
  config: {
    ...config,
    mode: env,
  },
  files,
});

module.exports = injectMode;
