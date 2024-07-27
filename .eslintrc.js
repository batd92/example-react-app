module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // https://blog.logrocket.com/12-essential-eslint-rules-react/
        "react/button-has-type": "warn",
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/no-array-index-key": "warn",
        "react/react-in-jsx-scope": "error",
        "react/jsx-uses-react": "off",
        "react/display-name": "warn",
        "react/no-danger-with-children": "warn",
        "react/jsx-no-bind": "warn",
        "react/no-children-prop": "warn"
    },
};
