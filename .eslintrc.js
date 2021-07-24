module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  'plugins': ['react'],
  extends: [
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    jsx: "react",
    ecmaVersion: 6,
    ecmaFeatures: {
      "jsx": true,
      "impliedStrict": true
    },
    sourceType: "module",
    useJSXTextNode: true,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    "prefer-const": 'off',
    'react/display-name': "off",
    '@typescript-eslint/no-unused-vars-experimental': ["warn", { ignoreArgsIfArgsAfterAreUsed: false }],
    'arrow-body-style': ["error", "as-needed"],
    'max-statements-per-line': ["error", { "max": 2 }],
    'newline-per-chained-call': ["error", { "ignoreChainWithDepth": 1 }],
    "indent": ["error", 2],
    'implicit-arrow-linebreak': ["error", "beside"],
    'quotes': ['warn', 'single', { avoidEscape: true }],
    "react/jsx-key": ["warn", { "checkFragmentShorthand": false }], 
    "react/jsx-first-prop-new-line":  ['warn', 'multiline'],
    "react/jsx-max-props-per-line": ['warn', {  "when": "multiline" }],
    'function-paren-newline': ["error", { "minItems": 2 }],
    'function-call-argument-newline': ["error", "always"],
    'array-bracket-newline': ["error",  { "multiline": true }],
    'array-element-newline': ["error", {"ArrayExpression": "never","ArrayPattern": { "minItems": 3 }}],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
    },
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  }
}
