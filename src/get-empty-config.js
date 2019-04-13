module.exports = (scopeNames) =>
  scopeNames.reduce(
    (prevConfig, scopeName) => ({
      config: {
        ...prevConfig.config,
        [scopeName]: {},
      },
      files: [],
    }),
    { config: {} }
  );
