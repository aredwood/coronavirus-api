module.exports = {
    "env": {},
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "rules":{
        "no-multiple-empty-lines":["error",{
            "max":1
        }]
    },
    "plugins": [
        "@typescript-eslint",
    ]
};
