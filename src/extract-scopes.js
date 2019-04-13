const getNewConfig = ({ scopes, env, scopeName, prevConfig, prevFiles }) => {
  const { value, file } = scopes[env][scopeName];
  return {
    config: {
      ...prevConfig,
      [scopeName]: value,
    },
    files: [...prevFiles, file],
  };
};

module.exports = ({ scopeNames, scopes, env, dir }) =>
  scopeNames
    ? scopeNames.reduce(
        ({ config: prevConfig, files: prevFiles }, scopeName) => {
          if (!scopes[env] || !scopes[env][scopeName]) {
            const message = !scopes[env]
              ? `Environment ${env} doesn't declare in scope files`
              : `Config file "${scopeName}" doesn't exist in directory "${dir}"`;
            console.warn(`${message}. Return empty object.`);
            return {
              config: {
                ...prevConfig,
                [scopeName]: {},
              },
              files: prevFiles,
            };
          }
          return getNewConfig({
            scopes,
            env,
            scopeName,
            prevConfig,
            prevFiles,
          });
        },
        { config: {}, files: [] }
      )
    : Object.keys(scopes[env]).reduce(
        ({ config: prevConfig, files: prevFiles }, scopeName) =>
          getNewConfig({
            scopes,
            env,
            scopeName,
            prevConfig,
            prevFiles,
          }),
        { config: {}, files: [] }
      );
