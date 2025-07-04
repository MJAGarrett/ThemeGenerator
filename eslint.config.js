import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";


export default tseslint.config([
  globalIgnores([ "dist", "node_modules" ]),
  {
    files: [ "**/*.{ts,tsx,js}" ],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: { "@stylistic": stylistic },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@stylistic/indent": [ "error", 2 ],
      "@stylistic/indent-binary-ops": [ "error", 2 ],
      "@stylistic/comma-dangle": [ "error", "always-multiline" ],
      "@stylistic/comma-spacing": [ "error", { "before": false, "after": true }],
      "@stylistic/comma-style": [ "error", "last" ],
      "@stylistic/quotes": [ "error", "double" ],
      "@stylistic/semi": [ "error", "always" ],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/semi-spacing": [ "error", { "after": true, "before": false }],
      "@stylistic/semi-style": [ "error", "last" ],
      "@stylistic/space-unary-ops": [ "error", { "words": true, "nonwords": false }],
      "@stylistic/brace-style": [ "error", "stroustrup" ],
      "@stylistic/array-bracket-spacing": [ "error", "always", { "objectsInArrays": false }],
      "@stylistic/array-bracket-newline": [ "error", { "multiline": true }],
      "@stylistic/arrow-parens": [ "error", "always" ],
      "@stylistic/no-extra-parens": "error",
      "@stylistic/object-curly-newline": [ "error", { "multiline": true }],
      "@stylistic/object-curly-spacing": [ "error", "always", { "objectsInObjects": false }],
      "@stylistic/wrap-iife": [ "error", "inside" ],
      "@stylistic/eol-last": [ "error", "always" ],
      "@stylistic/linebreak-style": [ "error", "unix" ],
      "@stylistic/newline-per-chained-call": [ "error", { "ignoreChainWithDepth": 2 }],
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/type-generic-spacing": [ "error" ],
      "@stylistic/type-named-tuple-spacing": [ "error" ],
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-multi-spaces": [ "error" ],
      "@stylistic/no-multiple-empty-lines": [ "error", { "max": 2, "maxEOF": 0, "maxBOF": 0 }],
      "@stylistic/no-trailing-spaces": "error",

      "@stylistic/jsx-child-element-spacing": "error",
      "@stylistic/jsx-closing-bracket-location": "error",
      "@stylistic/jsx-closing-tag-location": "error",
      "@stylistic/jsx-curly-brace-presence": [ "error", { "propElementValues": "always" }],
      "@stylistic/jsx-curly-spacing": [
        "error", {
          "when": "always",
          "chilren": true,
          "spacing": { "objectLiterals": "never" },
        },
      ],
      "@stylistic/jsx-equals-spacing": [ "error", "never" ],
      "@stylistic/jsx-first-prop-new-line": "error",
      "@stylistic/jsx-indent-props": [ "error", 2 ],
      "@stylistic/jsx-quotes": [ "error", "prefer-double" ],
    },
  },
]);
