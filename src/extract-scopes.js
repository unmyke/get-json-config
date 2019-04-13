module.exports = ({ scopeNames, scopes, env, dir }) =>
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
  );
