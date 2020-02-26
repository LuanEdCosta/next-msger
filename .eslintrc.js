module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'eslint-plugin-jsx-a11y', 'react-hooks', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
      'babel-module': {},
    },
  },
}
