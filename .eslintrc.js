module.exports = {
    "env": {
        "node":true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "ignorePatterns": ["dist/", "node_modules/"],
    "rules": {
        "no-console": 1,
        "no-dupe-args":1,
        "no-duplicate-case": 1,
        "no-empty": 1,
        "eqeqeq": ["error", "smart"],
        "comma-spacing": [1, { "before": false, "after": true }],
        "no-trailing-spaces": 1,
        "no-empty-function": "error",
        "space-infix-ops": ["error", { "int32Hint": false }],
        "quotes": ["error", "double",{ "allowTemplateLiterals": true }],
        "object-curly-spacing": ["error", "never"],
        "array-bracket-spacing": ["error", "never"]
    }
};