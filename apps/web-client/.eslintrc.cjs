/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'coverage/'],
  plugins: ['react', 'import'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:import/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
};
