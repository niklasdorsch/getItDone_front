module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
    ],
    "parserOptions": {
    	"sourceType": "module",
    },
    "parser": "babel-eslint",
    "rules": {
    	"require-jsdoc": "off",
    	"comma-style": ["error", "last"],
    	"semi-style": ["error", "last"],
        "semi": [ "error", "always" ],
        "no-trailing-spaces": "error",
        "indent": ["error", 4],
        "object-curly-spacing": "error",
        "func-names": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/prop-types": "off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],

    },
};
