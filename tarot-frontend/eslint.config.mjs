import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: { globals: globals.browser },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": [
        "error",
        {
          singleQuote: false, // Match .prettierrc setting
          trailingComma: "es5", // Match .prettierrc setting
        },
      ],
    },
  },
];
