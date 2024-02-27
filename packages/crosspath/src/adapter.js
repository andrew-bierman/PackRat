export const withCrossPath =
  (adapter) =>
  (prevConfig = {}) => {
    return {
      ...prevConfig,
      webpack(config, options) {
        if (!config.resolve) {
          config.resolve = {};
        }

        config.resolve.extensions = [
          `.${adapter}.ts`,
          `.${adapter}.tsx`,
          ...(config.resolve?.extensions ?? []),
        ];

        if (typeof prevConfig.webpack === 'function') {
          return prevConfig.webpack(config, options);
        }

        return config;

        return config;
      },
    };
  };
