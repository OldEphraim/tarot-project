import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,jsx}"] },
  { languageOptions: { globals: globals.browser } },

  // ESLint Recommended Configs
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Add Prettier Plugin and Configurations
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules, // Disable ESLint rules that conflict with Prettier
      "prettier/prettier": "error", // Treat Prettier issues as ESLint errors
    },
  },
];
