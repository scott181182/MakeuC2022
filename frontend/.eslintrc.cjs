module.exports = {
    extends: "next/core-web-vitals",
    rules: {
        "array-bracket-spacing": [ "error", "always" ],
        "arrow-parens": [ "error", "always" ],
        "brace-style": [ "off" ],
        "indent": [ "error", 4 ],
        "keyword-spacing": [ "error", {
            overrides: {
                catch: { after: false },
                for: { after: false },
                if: { after: false },
                while: { after: false }
            }
        } ],
        "key-spacing": [ "warn", {
            mode: "minimum"
        } ],
        "lines-between-class-members": [ "off" ],
        "no-multi-spaces": [ "off" ],
        "no-multiple-empty-lines": [ "error", {
            max: 5,
            maxBOF: 3,
            maxEOF: 1
        } ],
        "no-use-before-define": [ "off", { classes: false, functions: false } ],
        "no-useless-constructor": [ "off" ],
        "quotes": [ "error", "double" ],
        "quote-props": [ "error", "consistent-as-needed" ],
        "semi": [ "error", "always" ],
        "space-before-function-paren": [ "error", {
            anonymous: "never",
            named: "never",
            asyncArrow: "always"
        } ],
        // "@typescript-eslint/explicit-module-boundary-types": ["off"],
        // "@typescript-eslint/no-explicit-any": ["off"],
        // "@typescript-eslint/no-unused-vars": ["error", {
        //     "varsIgnorePattern": "^_",
        //     "argsIgnorePattern": "^_",
        //     "caughtErrorsIgnorePattern": "^_",
        //     "destructuredArrayIgnorePattern": "^_",
        // }],
        // "sort-imports": ["error", {
        //     "ignoreCase": false,
        //     "ignoreDeclarationSort": false,
        //     "ignoreMemberSort": false,
        //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        //     "allowSeparatedGroups": true
        // }],
        "sort-import": [ "off" ],

        "react/jsx-equals-spacing": [ "error", "never" ],
        "react/jsx-tag-spacing": [
            "error", {
                beforeSelfClosing: "never",
                beforeClosing: "never"
            }
        ]
    },
};
