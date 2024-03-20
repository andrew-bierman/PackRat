import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'test/tsconfig.json',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  //   setupFiles: ['./test/setup.js'],
  testEnvironment: 'ts-node',
  testEnvironmentOptions: {
    modules: true,
  },
};

export default jestConfig;
