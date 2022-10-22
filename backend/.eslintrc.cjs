module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: "standard-with-typescript",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
    },
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
        // "sort-imports": ["error", {
        //     "ignoreCase": false,
        //     "ignoreDeclarationSort": false,
        //     "ignoreMemberSort": false,
        //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        //     "allowSeparatedGroups": true
        // }],
        "sort-import": [ "off" ]
    },
    overrides: [
        {
            files: [ "*.ts" ],
            rules: {
                "@typescript-eslint/brace-style": [ "off" ],
                "@typescript-eslint/explicit-function-return-type": [ "off" ],
                "@typescript-eslint/indent": [ "error", 4 ],
                "@typescript-eslint/keyword-spacing": [ "error", {
                    overrides: {
                        catch: { after: false },
                        for: { after: false },
                        if: { after: false },
                        while: { after: false }
                    }
                } ],
                "@typescript-eslint/quotes": [ "error", "double" ],
                "@typescript-eslint/semi": [ "error", "always" ],
                "@typescript-eslint/member-delimiter-style": [ "error", {
                    multiline: { delimiter: "semi" },
                    singleline: { delimiter: "semi" }
                } ],
                // "@typescript-eslint/explicit-module-boundary-types": ["off"],
                "@typescript-eslint/no-explicit-any": [ "error" ],
                // "@typescript-eslint/no-unused-vars": ["error", {
                //     "varsIgnorePattern": "^_",
                //     "argsIgnorePattern": "^_",
                //     "caughtErrorsIgnorePattern": "^_",
                //     "destructuredArrayIgnorePattern": "^_",
                // }],
                "@typescript-eslint/space-before-function-paren": [ "error", {
                    anonymous: "never",
                    named: "never",
                    asyncArrow: "always"
                } ],
                "@typescript-eslint/strict-boolean-expressions": [ "error", {
                    allowNullableString: true
                } ]
            }
        }
    ]
};
