module.exports.withCrossPath =
  (adapter) =>
  (prevConfig = {}) => {
    return {
      ...prevConfig,
      webpack(config, options) {
        if (!config.resolve) {
          config.resolve = {};
        }

        config.resolve.extensions = [
          `.${adapter}.js`,
          `.${adapter}.jsx`,
          ...(config.resolve?.extensions ?? []),
        ];

        config.resolve.alias = {
          '@crosspath-resolver': `./resolver.${adapter}.js`,
          ...(config.resolve?.alias ?? {}),
        };

        if (typeof prevConfig.webpack === 'function') {
          return prevConfig.webpack(config, options);
        }

        return config;
      },
    };
  };
