/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'coverage/'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
      plugins: ['react'],
      extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
      rules: {
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'eslint/no-alert': 'off',
        'eslint/no-shadow': 'off',
      },
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        node: true,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
