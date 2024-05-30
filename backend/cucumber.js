module.exports = {
    default: {
        paths: ['test/integration/**/*.feature'],
        requireModule: ['ts-node/register', 'tsconfig-paths/register'],
        require: ['test/integration/**/*.ts'],
        format: ['progress'],
    },
};
