module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "plugin:meteor/recommended", "airbnb"],
  globals: {
    Assets: true, // Meteor disallows importing of Assets, see https://docs.meteor.com/api/assets.html
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jsx", "meteor", "react"],
  rules: {
    "arrow-parens": "off",
    camelcase: "off",
    "class-methods-use-this": "off",
    "func-names": "off",
    "import/no-absolute-path": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/imports-first": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    indent: ["error", 2],
    "linebreak-style": "off",
    "max-len": ["error", 250],
    "meteor/eventmap-params": [
      2,
      { eventParamName: "event", templateInstanceParamName: "instance" },
    ],
    "meteor/template-names": "off",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "object-curly-newline": "off",
    "object-property-newline": "off",
    "object-shorthand": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "prefer-arrow-callback": "off",
    "prefer-destructuring": "off",
    "prefer-promise-reject-errors": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-one-expression-per-line": "off",
    "react/no-array-index-key": "off",
  },
};
