import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    resetMocks: true,
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@test/(.*)$': '<rootDir>/test/$1',
    },
    testRegex: '.spec.ts$',
};

// eslint-disable-next-line no-restricted-exports
export default config;
