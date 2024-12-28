// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginAstro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintReact from "eslint-plugin-react";
import { fixupPluginRules } from "@eslint/compat";

// @ts-expect-error
import eslintReactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  { ignores: ["node_modules/*", "dist/*", ".astro/*", "*.mjs", ".vercel/*"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  eslintConfigPrettier,
  ...tailwind.configs["flat/recommended"],
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    plugins: { "react-hooks": fixupPluginRules(eslintReactHooks) },
    rules: { ...eslintReactHooks.configs.recommended.rules },
  },
  {
    plugins: {
      // @ts-expect-error
      react: eslintReact.configs.flat.recommended,
      // @ts-expect-error
      jsxRuntime: eslintReact.configs.flat["jsx-runtime"],
    },
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  },
  {
    plugins: { sonarjs, perfectionist },
    settings: { perfectionist: { type: "line-length", partitionByComment: true } },
    rules: {
      "no-shadow": "off",
      "no-unused-vars": "off",
      "react/prop-types": "off",
      "func-name-matching": "error",
      "func-names": ["error", "always"],
      // sonarjs
      "sonarjs/void-use": "off",
      "sonarjs/todo-tag": "warn",
      "sonarjs/no-redeclare": "off",
      "sonarjs/unused-import": "off",
      "sonarjs/pseudo-random": "warn",
      "sonarjs/no-misused-promises": "off",
      "sonarjs/no-nested-functions": "off",
      "sonarjs/sonar-no-unused-vars": "off",
      "sonarjs/cognitive-complexity": "warn",
      // perfectionist
      "perfectionist/sort-maps": "warn",
      "perfectionist/sort-sets": "warn",
      "perfectionist/sort-enums": "warn",
      "perfectionist/sort-classes": "warn",
      "perfectionist/sort-exports": "warn",
      "perfectionist/sort-imports": "warn",
      "perfectionist/sort-objects": "warn",
      "perfectionist/sort-jsx-props": "warn",
      "perfectionist/sort-interfaces": "warn",
      "perfectionist/sort-switch-case": "warn",
      "perfectionist/sort-union-types": "warn",
      "perfectionist/sort-object-types": "warn",
      "perfectionist/sort-named-exports": "warn",
      "perfectionist/sort-named-imports": "warn",
      "perfectionist/sort-vue-attributes": "off",
      "perfectionist/sort-array-includes": "warn",
      "perfectionist/sort-astro-attributes": "off",
      "perfectionist/sort-svelte-attributes": "off",
      "perfectionist/sort-intersection-types": "warn",
      // typescript
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-expect-error": "allow-with-description" }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // "@typescript-eslint/no-deprecated": "warn",
      // "@typescript-eslint/switch-exhaustiveness-check": "warn",
      // "@typescript-eslint/prefer-promise-reject-errors": "warn",
      // "@typescript-eslint/restrict-template-expressions": [
      //   "warn",
      //   {
      //     allowNumber: true,
      //     allowBoolean: true,
      //     allowNullish: true,
      //   },
      // ],
    },
  },
);
