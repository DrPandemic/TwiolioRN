module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "flowtype",
    "react",
    "react-native",
    "flowtype-errors",
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  "rules": {
    "flowtype-errors/show-errors": 2,
  }
};
