const getConfig = require('../src');

const configSets = require('./config-sets');
const expectedConfigs = require('./expected-configs');

const warn = console.warn;

const envs = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
};
const dir = './tests/config';
const nonexistentConfigDir = './config';

describe('getJsonConfig', () => {
  describe('#async', () => {
    beforeEach(() => {
      console.warn = jest.fn((message) => {
        // warn(message);
      });
    });
    afterEach(() => {
      console.warn = warn;
    });

    context('takes no scope names', () => {
      test('should return all configs', () =>
        Promise.all([
          getConfig({ dir }),
          getConfig({ env: envs.TEST, dir }),
          getConfig({ env: envs.DEV, dir }),
          getConfig({ env: envs.PROD, dir }),
        ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
          expect(defaultConfig).toEqual(
            expectedConfigs.full[process.env.NODE_ENV]
          );
          expect(testConfig).toEqual(expectedConfigs.full[envs.TEST]);
          expect(devConfig).toEqual(expectedConfigs.full[envs.DEV]);
          expect(prodConfig).toEqual(expectedConfigs.full[envs.PROD]);
        }));
    });

    context('config directory exist', () => {
      context('takes all json config file names', () => {
        test('should return object contains configs from all json files per environment', () =>
          Promise.all([
            getConfig(configSets.full, { dir }),
            getConfig(configSets.full, { env: envs.TEST, dir }),
            getConfig(configSets.full, { env: envs.DEV, dir }),
            getConfig(configSets.full, { env: envs.PROD, dir }),
          ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
            expect(defaultConfig).toEqual(
              expectedConfigs.full[process.env.NODE_ENV]
            );
            expect(testConfig).toEqual(expectedConfigs.full[envs.TEST]);
            expect(devConfig).toEqual(expectedConfigs.full[envs.DEV]);
            expect(prodConfig).toEqual(expectedConfigs.full[envs.PROD]);
          }));
      });

      context('takes all and nonexistent json config file names', () => {
        test('should return object contains configs from all json files and with props with empty object for nonexistent names per environment', () =>
          Promise.all([
            getConfig(configSets.fullWithNonexistent, { dir }),
            getConfig(configSets.fullWithNonexistent, {
              env: envs.TEST,
              dir,
            }),
            getConfig(configSets.fullWithNonexistent, {
              env: envs.DEV,
              dir,
            }),
            getConfig(configSets.fullWithNonexistent, {
              env: envs.PROD,
              dir,
            }),
          ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
            expect(defaultConfig).toEqual(
              expectedConfigs.fullWithNonexistent[process.env.NODE_ENV]
            );
            expect(testConfig).toEqual(
              expectedConfigs.fullWithNonexistent[envs.TEST]
            );
            expect(devConfig).toEqual(
              expectedConfigs.fullWithNonexistent[envs.DEV]
            );
            expect(prodConfig).toEqual(
              expectedConfigs.fullWithNonexistent[envs.PROD]
            );

            expect(console.warn).toBeCalledTimes(12);
          }));
      });

      context('takes partial json config file names', () => {
        test('should return object contains configs from partial json files per environment', () =>
          Promise.all([
            getConfig(configSets.partial, { dir }),
            getConfig(configSets.partial, { env: envs.TEST, dir }),
            getConfig(configSets.partial, { env: envs.DEV, dir }),
            getConfig(configSets.partial, { env: envs.PROD, dir }),
          ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
            expect(defaultConfig).toEqual(
              expectedConfigs.partial[process.env.NODE_ENV]
            );
            expect(testConfig).toEqual(expectedConfigs.partial[envs.TEST]);
            expect(devConfig).toEqual(expectedConfigs.partial[envs.DEV]);
            expect(prodConfig).toEqual(expectedConfigs.partial[envs.PROD]);
          }));
      });

      context('takes nonexistent json config file names', () => {
        test('should return object contains props as passed names with empty object per environment', () =>
          Promise.all([
            getConfig(configSets.nonexistent, { dir }),
            getConfig(configSets.nonexistent, { env: envs.TEST, dir }),
            getConfig(configSets.nonexistent, { env: envs.DEV, dir }),
            getConfig(configSets.nonexistent, { env: envs.PROD, dir }),
          ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
            expect(defaultConfig).toEqual(expectedConfigs.nonexistent);
            expect(testConfig).toEqual(expectedConfigs.nonexistent);
            expect(devConfig).toEqual(expectedConfigs.nonexistent);
            expect(prodConfig).toEqual(expectedConfigs.nonexistent);

            expect(console.warn).toBeCalledTimes(12);
          }));
      });

      context('takes partial and nonexistent json config file names', () => {
        test('should return object contains configs from partial json files and with props with empty object for nonexistent names per environment', () =>
          Promise.all([
            getConfig(configSets.partialWithNonexistent, { dir }),
            getConfig(configSets.partialWithNonexistent, {
              env: envs.TEST,
              dir,
            }),
            getConfig(configSets.partialWithNonexistent, {
              env: envs.DEV,
              dir,
            }),
            getConfig(configSets.partialWithNonexistent, {
              env: envs.PROD,
              dir,
            }),
          ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
            expect(defaultConfig).toEqual(
              expectedConfigs.partialWithNonexistent[process.env.NODE_ENV]
            );
            expect(testConfig).toEqual(
              expectedConfigs.partialWithNonexistent[envs.TEST]
            );
            expect(devConfig).toEqual(
              expectedConfigs.partialWithNonexistent[envs.DEV]
            );
            expect(prodConfig).toEqual(
              expectedConfigs.partialWithNonexistent[envs.PROD]
            );

            expect(console.warn).toBeCalledTimes(12);
          }));
      });
    });

    context("config directory doesn't exists", () => {
      test('should return config object with empty object as requested props', () =>
        Promise.all([
          getConfig(configSets.full, { dir: nonexistentConfigDir }),
          getConfig(configSets.fullWithNonexistent, {
            dir: nonexistentConfigDir,
          }),
          getConfig(configSets.partial, { dir: nonexistentConfigDir }),
          getConfig(configSets.partialWithNonexistent, {
            dir: nonexistentConfigDir,
          }),
          getConfig(configSets.nonexistent, {
            dir: nonexistentConfigDir,
          }),
        ]).then(
          ([
            full,
            fullWithNonexistent,
            partial,
            partialWithNonexistent,
            nonexistent,
          ]) => {
            expect(full).toEqual(expectedConfigs.full.empty);
            expect(fullWithNonexistent).toEqual(
              expectedConfigs.fullWithNonexistent.empty
            );
            expect(partial).toEqual(expectedConfigs.partial.empty);
            expect(partialWithNonexistent).toEqual(
              expectedConfigs.partialWithNonexistent.empty
            );
            expect(nonexistent).toEqual(expectedConfigs.nonexistent);

            expect(console.warn).toBeCalledTimes(5);
          }
        ));
    });
  });

  describe('#sync', () => {
    beforeEach(() => {
      console.warn = jest.fn((message) => {
        // warn(message);
      });
    });
    afterEach(() => {
      console.warn = warn;
    });

    context('config directory exist', () => {
      context('takes all json config file names', () => {
        test('should return object contains configs from all json files per environment', () => {
          expect(getConfig.sync(configSets.full, { dir })).toEqual(
            expectedConfigs.full[process.env.NODE_ENV]
          );
          expect(
            getConfig.sync(configSets.full, { env: envs.TEST, dir })
          ).toEqual(expectedConfigs.full[envs.TEST]);
          expect(
            getConfig.sync(configSets.full, { env: envs.DEV, dir })
          ).toEqual(expectedConfigs.full[envs.DEV]);
          expect(
            getConfig.sync(configSets.full, { env: envs.PROD, dir })
          ).toEqual(expectedConfigs.full[envs.PROD]);
        });
      });

      context('takes all and nonexistent json config file names', () => {
        test('should return object contains configs from all json files and with props with empty object for nonexistent names per environment', () => {
          expect(
            getConfig.sync(configSets.fullWithNonexistent, { dir })
          ).toEqual(expectedConfigs.fullWithNonexistent[process.env.NODE_ENV]);
          expect(
            getConfig.sync(configSets.fullWithNonexistent, {
              env: envs.TEST,
              dir,
            })
          ).toEqual(expectedConfigs.fullWithNonexistent[envs.TEST]);
          expect(
            getConfig.sync(configSets.fullWithNonexistent, {
              env: envs.DEV,
              dir,
            })
          ).toEqual(expectedConfigs.fullWithNonexistent[envs.DEV]);
          expect(
            getConfig.sync(configSets.fullWithNonexistent, {
              env: envs.PROD,
              dir,
            })
          ).toEqual(expectedConfigs.fullWithNonexistent[envs.PROD]);

          expect(console.warn).toBeCalledTimes(12);
        });
      });

      context('takes partial json config file names', () => {
        test('should return object contains configs from partial json files per environment', () => {
          expect(getConfig.sync(configSets.partial, { dir })).toEqual(
            expectedConfigs.partial[process.env.NODE_ENV]
          );
          expect(
            getConfig.sync(configSets.partial, { env: envs.TEST, dir })
          ).toEqual(expectedConfigs.partial[envs.TEST]);
          expect(
            getConfig.sync(configSets.partial, { env: envs.DEV, dir })
          ).toEqual(expectedConfigs.partial[envs.DEV]);
          expect(
            getConfig.sync(configSets.partial, { env: envs.PROD, dir })
          ).toEqual(expectedConfigs.partial[envs.PROD]);
        });
      });

      context('takes nonexistent json config file names', () => {
        test('should return object contains props as passed names with empty object per environment', () => {
          expect(getConfig.sync(configSets.nonexistent, { dir })).toEqual(
            expectedConfigs.nonexistent
          );
          expect(
            getConfig.sync(configSets.nonexistent, { env: envs.TEST, dir })
          ).toEqual(expectedConfigs.nonexistent);
          expect(
            getConfig.sync(configSets.nonexistent, { env: envs.DEV, dir })
          ).toEqual(expectedConfigs.nonexistent);
          expect(
            getConfig.sync(configSets.nonexistent, { env: envs.PROD, dir })
          ).toEqual(expectedConfigs.nonexistent);

          expect(console.warn).toBeCalledTimes(12);
        });
      });

      context('takes partial and nonexistent json config file names', () => {
        test('should return object contains configs from partial json files and with props with empty object for nonexistent names per environment', () => {
          expect(
            getConfig.sync(configSets.partialWithNonexistent, { dir })
          ).toEqual(
            expectedConfigs.partialWithNonexistent[process.env.NODE_ENV]
          );
          expect(
            getConfig.sync(configSets.partialWithNonexistent, {
              env: envs.TEST,
              dir,
            })
          ).toEqual(expectedConfigs.partialWithNonexistent[envs.TEST]);
          expect(
            getConfig.sync(configSets.partialWithNonexistent, {
              env: envs.DEV,
              dir,
            })
          ).toEqual(expectedConfigs.partialWithNonexistent[envs.DEV]);
          expect(
            getConfig.sync(configSets.partialWithNonexistent, {
              env: envs.PROD,
              dir,
            })
          ).toEqual(expectedConfigs.partialWithNonexistent[envs.PROD]);

          expect(console.warn).toBeCalledTimes(12);
        });
      });
    });

    context("config directory doesn't exists", () => {
      test('should return config object with empty object as requested props', () => {
        expect(
          getConfig.sync(configSets.full, { dir: nonexistentConfigDir })
        ).toEqual(expectedConfigs.full.empty);
        expect(
          getConfig.sync(configSets.fullWithNonexistent, {
            dir: nonexistentConfigDir,
          })
        ).toEqual(expectedConfigs.fullWithNonexistent.empty);
        expect(
          getConfig.sync(configSets.partial, { dir: nonexistentConfigDir })
        ).toEqual(expectedConfigs.partial.empty);
        expect(
          getConfig.sync(configSets.partialWithNonexistent, {
            dir: nonexistentConfigDir,
          })
        ).toEqual(expectedConfigs.partialWithNonexistent.empty);
        expect(
          getConfig.sync(configSets.nonexistent, { dir: nonexistentConfigDir })
        ).toEqual(expectedConfigs.nonexistent);

        expect(console.warn).toBeCalledTimes(5);
      });
    });
  });
});
