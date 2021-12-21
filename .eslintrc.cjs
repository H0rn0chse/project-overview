/* eslint-env node */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["off"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "eol-last": ["error", "always"],
        "no-unused-vars": "warn"
    }
};