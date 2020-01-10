const addModeToExpectedConfig = ({ config, files }, env) => ({
  config: { ...config, mode: env },
  files,
});
module.exports = addModeToExpectedConfig;
