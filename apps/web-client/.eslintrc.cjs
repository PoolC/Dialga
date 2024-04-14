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
        'react/jsx-no-bind': 'off',
        'react/destructuring-assignment': 'off',
        'react/no-array-index-key': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],

        // 아래 내용들은 수정의 범위가 너무 넓어지므로 일단 off로 설정
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/control-has-associated-control': 'off',
        'no-alert': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',
        'no-restricted-globals': 'off',
        'no-undef': 'off',
        'no-restricted-syntax': 'off',
        'no-plusplus': 'off',
        // @typescript-eslint/no-explicit-any와 중복되므로
        'no-unused-vars': 'off',
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
